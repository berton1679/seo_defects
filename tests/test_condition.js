/** Test Cond Class */
const expect = require('chai').expect;
const cond = require('./../lib/condition.js');

describe('Test Cond Class', function() {
  it('test tag()', function() {
    const testCond = new cond.Cond();
    const testTag = 'test';
    const tag = testCond.tag(testTag);
    expect(tag._tagName).to.equal(testTag);
    expect(tag._tagCondition(testTag, null)).to.equal(true);
  });

  it('test exist()', function() {
    const testCond = new cond.Cond();
    const testTag = 'testTag';
    const testAttrib = 'testAttrib';
    const testAttribValue = 'value';
    const tagCond = testCond.tag(testTag).exist();

    expect(tagCond._condition(testTag + 'suffix',
        {
          'testAttrib': 'value',
        })).to.equal(false);
    expect(tagCond._condition(testTag,
        {
          'testAttrib': 'value1234',
        })).to.equal(true);

    const tagAttribute = testCond.tag(testTag).attrib(testAttrib);
    const existCond = tagAttribute.exist(testAttribValue);
    expect(existCond._condVal).to.equal(testAttribValue);
    expect(existCond._condition(testTag,
        {
          'testAttrib': 'value',
        })).to.equal(true);
    expect(existCond._condition(testTag,
        {
          'testAttrib': 'value1234',
        })).to.equal(false);
    expect(existCond._condition(testTag,
        {
          'testAttribs': 'value1234',
        })).to.equal(false);

    const existEmptyCond = tagAttribute.exist();
    expect(existEmptyCond._condVal).to.be.a('null');
    expect(existEmptyCond._condition(testTag,
        {
          'testAttrib': 'value111',
        })).to.equal(true);
  });

  it('test notEexist()', function() {
    const testCond = new cond.Cond();
    const testTag = 'testTag';
    const testAttrib = 'testAttrib';
    const testAttribValue = 'value';
    const tagCond = testCond.tag(testTag).notExist();

    expect(tagCond._condition(testTag + 'suffix',
        {
          'testAttrib': 'value',
        })).to.equal(false);
    const tagAttribute = testCond.tag(testTag).attrib(testAttrib);
    const notExistCond = tagAttribute.notExist(testAttribValue);
    expect(notExistCond._condVal).to.equal(testAttribValue);
    expect(notExistCond._condition(testTag,
        {
          'testAttrib': 'value123',
        })).to.equal(true);
    expect(notExistCond._condition(testTag,
        {
          'testAttrib1234': 'value123',
        })).to.equal(true);
    expect(notExistCond._condition(testTag,
        {
          'testAttrib': 'value',
        })).to.equal(false);

    const notExistEmptyCond = tagAttribute.notExist();
    expect(notExistEmptyCond._condVal).to.be.a('null');
    expect(notExistEmptyCond._condition(testTag,
        {
          'test': 'value111',
        })).to.equal(true);
    expect(notExistEmptyCond._condition(testTag,
        {
          'testAttrib': 'value111',
        })).to.equal(false);
  });

  it('test has()', function() {
    const testCond = new cond.Cond();
    const testChildCond = new cond.Cond();
    const testTag = 'test';
    const testChildTag = 'testChild';
    const tagCond = testCond.tag(testTag);
    const childCond = testChildCond.tag(testChildTag);
    const parentCond = tagCond.has(childCond);

    expect(parentCond._child).to.equal(childCond);
  });

  it('test checkValid() process', function() {
    const testCond = new cond.Cond();
    const testChildCond = new cond.Cond();
    const testTag = 'test';
    const testChildTag = 'testChild';
    const tagCond = testCond.tag(testTag);
    const childCond = testChildCond.tag(testChildTag);

    expect(tagCond.checkValid(testTag, {})).to.equal(true);

    const parentCond = tagCond.has(childCond);

    expect(parentCond.checkValid(testTag, {})).to.equal(false);
    expect(parentCond._inScopeCount).to.equal(1);
    expect(parentCond.checkValid(testChildTag, {})).to.equal(true);

    parentCond.closeTag(testTag);
    expect(parentCond._inScopeCount).to.equal(0);
  });

  it('test tag has attribute with certain value', function() {
    const testCond = new cond.Cond();
    const testTag = 'test';
    const testAttrib = 'testAttrib';
    const testAttribValue = 'testAttribValue';
    const testTotalCond = testCond.tag(testTag)
        .attrib(testAttrib).exist(testAttribValue);

    expect(testTotalCond.checkValid(testTag, {
      'testAttrib': 'testAttribValue',
    })).to.equal(true);
  });
});
