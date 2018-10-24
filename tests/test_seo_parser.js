/** Test Cond Class */
const expect = require('chai').expect;
const seoDefects = require('..');
const Rule = seoDefects.Rule;
const Cond = seoDefects.Cond;
const SeoParser = seoDefects.SeoParser;
const SeoParserInputError = seoDefects.SeoParserInputError;

const sinon = require('sinon');
const stream = require('stream');

describe('Test SeoParser Class', function() {
  it('test file', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    parser.init(
        seoDefects.fileReadableStream('tests/data/test.html'),
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
        seoDefects.fileReadableStream('tests/data/test.html'),
        stubOutputStream))
        .to.throw(SeoParserInputError, 'writable');
  });
  it('test chain rules', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    const rules = [
      seoDefects.aWithoutRel(),
      seoDefects.h1Unique(),
      seoDefects.inHeadMetaNameIsDescriptions(),
      seoDefects.strongGreaterNum(1),
    ];
    parser.init(
        seoDefects.fileReadableStream('tests/data/test.html'),
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
      seoDefects.h1Unique(),
      seoDefects.inHeadMetaNameIsDescriptions(),
      seoDefects.strongGreaterNum(1),
      userRule,
    ];
    parser.init(
        seoDefects.fileReadableStream('tests/data/test.html'),
        stubOutputStream,
        rules);
    const endCb = function() {
      expect(stubOutputStream.write.calledTwice).to.true;
      done();
    };
    parser.parse(endCb);
  });
  it('test imgWithoutAlt', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    parser.init(
        seoDefects.fileReadableStream('tests/data/test1.html'),
        stubOutputStream);
    const endCb = function() {
      expect(stubOutputStream.write.calledOnce).to.true;
      done();
    };
    parser.parse(endCb);
  });
  it('test aWithoutRel', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    parser.init(
        seoDefects.fileReadableStream('tests/data/test2.html'),
        stubOutputStream);
    const endCb = function() {
      expect(stubOutputStream.write.calledOnce).to.true;
      done();
    };
    parser.parse(endCb);
  });
  it('test inHead', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    parser.init(
        seoDefects.fileReadableStream('tests/data/test3.html'),
        stubOutputStream);
    const endCb = function() {
      expect(stubOutputStream.write.calledThrice).to.true;
      done();
    };
    parser.parse(endCb);
  });
  it('test strongGreaterNum', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    parser.init(
        seoDefects.fileReadableStream('tests/data/test4.html'),
        stubOutputStream);
    const endCb = function() {
      expect(stubOutputStream.write.calledOnce).to.true;
      done();
    };
    parser.parse(endCb);
  });
  it('test h1Unique', function(done) {
    const stubOutputStream = sinon.createStubInstance(stream.Writable, {
      write: sinon.spy(),
    });
    const parser = new SeoParser();
    parser.init(
        seoDefects.fileReadableStream('tests/data/test5.html'),
        stubOutputStream);
    const endCb = function() {
      expect(stubOutputStream.write.calledOnce).to.true;
      done();
    };
    parser.parse(endCb);
  });
});
