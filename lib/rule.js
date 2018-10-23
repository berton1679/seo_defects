const util = require('util');

/**  Rule class */
class Rule {
  /**
  * @param {Cond} condition the condition to be checked
  */
  constructor(condition) {
    this._condition = condition;
    this._validCount = 0;
    this._errorCondition = null;
    this._errorMsg = '';
    this._condVal = null;
  }
  /**
   * Internal API called on opentag in htmlparser2
   * @param {string} tagName
   * @param {string} attribs
   */
  openTag(tagName, attribs) {
    if (this._condition.checkValid(tagName, attribs)) {
      this._validCount += 1;
    }
  }
  /**
   * Check the num of valid counts
   * @param {number} val
   * @return {Rule} rule object
   */
  equal(val) {
    this._condVal = val;
    this._errorCondition = function() {
      return this._validCount == this._condVal;
    };
    return this;
  }
  /**
   * Check the num of valid counts
   * @param {number} val
   * @return {Rule} rule object
   */
  less(val) {
    this._condVal = val;
    this._errorCondition = function() {
      return this._validCount < this._condVal;
    };
    return this;
  }
  /**
   * Check the num of valid counts
   * @param {number} val
   * @return {Rule} rule object
   */
  greater(val) {
    this._condVal = val;
    this._errorCondition = function() {
      return this._validCount > this._condVal;
    };
    return this;
  }
  /**
   * Set error message
   * @param {string} val
   */
  msg(val) {
    this._errorMsg = val;
  }
  /**
   * Internal API called on closetag in htmlparser2
   * @param {string} tagName
   */
  closeTag(tagName) {
    this._condition.closeTag(tagName);
  }
  /**
   * write to writable stream
   * @param {Stream} stream output
   */
  check(stream) {
    if (this._errorCondition()) {
      let output = this._errorMsg + '\n';
      output = util.format(output, this._validCount);
      if (output[output.length - 1] != '\n') {
        const index = output.lastIndexOf('\n');
        output = output.substr(0, index + 1);
      }
      stream.write(output);
    }
  }
}

exports.Rule = Rule;
