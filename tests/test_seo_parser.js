/** Test Cond Class */
const expect = require('chai').expect;
const api = require('../lib/seo_parser.js');
const Rule = require('../lib/rule.js').Rule;
const Cond = require('./../lib/condition.js').Cond;
const SeoParser = api.SeoParser;
const SeoParserInputError = api.SeoParserInputError;
const seoRule = require('../lib/seo_rule.js');
const seoStream = require('../lib/seo_stream.js');

const sinon = require('sinon');
const stream = require('stream');

describe('Test SeoParser Class', function() {
  it('test file', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    parser.init(
        seoStream.fileReadableStream('tests/data/test.html'),
        stubOutputStream);
    const endCb = function() {
      expect(stubOutputStream.write.calledOnce).to.true;
      done();
    };
    parser.parse(endCb);
  });
  it('test invalid readable Stream', function() {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });

    const parser = new SeoParser();
    expect(() => parser.init(1234, stubOutputStream))
        .to.throw(SeoParserInputError, 'readable');
  });
  it('test invalid writable Stream', function() {
    const stubOutputStream = {
      write: sinon.spy(),
    };

    const parser = new SeoParser();
    expect(() => parser.init(
        seoStream.fileReadableStream('tests/data/test.html'),
        stubOutputStream))
        .to.throw(SeoParserInputError, 'writable');
  });
  it('test chain rules', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    const rules = [
      seoRule.aWithoutRel(),
      seoRule.h1Unique(),
      seoRule.inHeadMetaNameIsDescriptions(),
      seoRule.strongGreaterNum(1),
    ];
    parser.init(
        seoStream.fileReadableStream('tests/data/test.html'),
        stubOutputStream,
        rules);
    const endCb = function() {
      expect(stubOutputStream.write.calledTwice).to.true;
      done();
    };
    parser.parse(endCb);
  });
  it('test user-defined rules', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    let cond = new Cond();
    cond = cond.tag('meta').attrib('name').exist('test');
    const userRule = new Rule(cond);
    userRule.equal(0);
    const rules = [
      seoRule.h1Unique(),
      seoRule.inHeadMetaNameIsDescriptions(),
      seoRule.strongGreaterNum(1),
      userRule,
    ];
    parser.init(
        seoStream.fileReadableStream('tests/data/test.html'),
        stubOutputStream,
        rules);
    const endCb = function() {
      expect(stubOutputStream.write.calledTwice).to.true;
      done();
    };
    parser.parse(endCb);
  });
});
