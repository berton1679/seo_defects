/** Test Cond Class */
const expect = require('chai').expect;
const Rule = require('..').Rule;
const sinon = require('sinon');

describe('Test Rule Class', function() {
  it('test equal, less, greater, msg function', function() {
    let testRule = new Rule();
    testRule = testRule.equal(1);
    expect(testRule._errorCondition()).to.equal(false);

    testRule = testRule.less(1);
    expect(testRule._errorCondition()).to.equal(true);

    testRule = testRule.greater(1);
    expect(testRule._errorCondition()).to.equal(false);

    testRule.msg('testMsg');
    expect(testRule._errorMsg).to.equal('testMsg');
  });

  it('test openTag()', function() {
    const mockCond = {
      checkValid: sinon.fake.returns(true),
      closeTag: sinon.fake.returns(false),
    };
    const testRule = new Rule(mockCond);
    testRule.openTag(null, null);
    expect(testRule._validCount).to.equal(1);
    testRule.closeTag(null, null);
  });

  it('test check()', function() {
    const mockStream = {
      write: sinon.spy(),
    };
    let testRule = new Rule();
    testRule = testRule.less(1);
    testRule.msg('testMsg');
    testRule.check(mockStream);
    expect(mockStream.write.calledWith('testMsg\n')).to.true;

    testRule = testRule.less(1);
    testRule.msg('testMsg %d');
    mockStream.write.resetHistory();
    testRule.check(mockStream);
    expect(mockStream.write.calledWith('testMsg 0\n')).to.true;

    testRule = testRule.equal(1);
    testRule.msg('testMsg %d');
    mockStream.write.resetHistory();
    testRule.check(mockStream);
    expect(mockStream.write.notCalled).to.true;
  });
});
