/**  Cond class */
class Cond {
  /** constructor  */
  constructor() {
    this._attribute = null;
    this._tagName = null;
    this._condition = null;
    this._tagCondition = null;
    this._condVal = null;
    this._child = null;
    this._inScopeCount = 0;
  }

  /**
   * Set html tag
   * @param {string} tag
   * @return {Cond} condition class
   */
  tag(tag) {
    this._tagName = tag;
    this._tagCondition = function(tagName) {
      return this._tagName == tagName;
    };
    return this;
  }
  /**
   * Set attribute
   * @param {string} name
   * @return {Cond} condition class
   */
  attrib(name) {
    this._attribute = name;
    return this;
  }
  /**
   * Set attribute value(default null)
   * @param {string} val
   * @return {Cond} condition class
   */
  exist(val = null) {
    this._condVal = val;
    this._condition = function(tagName, attribs) {
      // pass if tag is not equal
      const tagCond = this._tagCondition(tagName);
      if (!tagCond) {
        return false;
      }
      // do not check attribute
      if (this._attribute == null) {
        return tagCond;
      }
      // check attribute and its value
      if (attribs.hasOwnProperty(this._attribute)) {
        if (this._condVal == null) {
          return true;
        } else {
          return attribs[this._attribute] == this._condVal;
        }
      } else {
        return false;
      }
    };
    return this;
  }
  /**
   * Set attribute value(default null)
   * @param {string} val
   * @return {Cond} condition class
   */
  notExist(val = null) {
    this._condVal = val;
    this._condition = function(tagName, attribs) {
      // pass if tag is not equal
      if (!this._tagCondition(tagName)) {
        return false;
      }
      // check whether attribute and its val
      if (attribs.hasOwnProperty(this._attribute)) {
        if (this._condVal == null) {
          return false;
        } else {
          return attribs[this._attribute] != this._condVal;
        }
      } else {
        return true;
      }
    };
    return this;
  }
  /**
   * @param {string} tagName
   * @param {string} attribs
   * @return {Cond} condition
   */
  _allCondition(tagName, attribs) {
    if (this._condition == null) {
      return this._tagCondition(tagName);
    }
    return this._condition(tagName, attribs);
  }
  /**
   * Check whether satify condition
   * @param {string} tagName
   * @param {string} attribs
   * @return {boolean} valid or not
   */
  checkValid(tagName, attribs) {
    let valid = false;
    if (this._child != null) {
      if (this._inScopeCount > 0) {
        valid = this._child._allCondition(tagName, attribs);
      } else {
        if (this._allCondition(tagName, attribs)) {
          this._inScopeCount += 1;
        }
      }
    } else {
      valid = this._allCondition(tagName, attribs);
    }
    return valid;
  }
  /**
   * @param {Cond} cond
   * @return {Cond} current  class
   */
  has(cond) {
    this._child = cond;
    return this;
  }
  /**
   * Called exist tag scope
   * @param {string} tagName
   */
  closeTag(tagName) {
    if (this._child != null && this._tagName == tagName &&
      this._inScopeCount > 0) {
      this._inScopeCount -= 1;
    }
  }
}

exports.Cond = Cond;
