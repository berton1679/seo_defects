/** Pre-defined SEO class */
const Rule = require('./rule.js').Rule;
const Cond = require('./condition.js').Cond;
const util = require('util');

/**
 * image without alt attribute
 * @return {Rule} rule object
 */
function imgWithoutAlt() {
  let condObj = new Cond();
  condObj = condObj.tag('img').attrib('alt').notExist();
  const rule = new Rule(condObj).greater(0);

  rule.msg(
      'There are %d <img> tag without alt attribute.'
  );
  return rule;
};

/**
 * a without rel attribute
 * @return {Rule} rule object
 */
function aWithoutRel() {
  let condObj = new Cond();
  condObj = condObj.tag('a').attrib('rel').notExist();
  const rule = new Rule(condObj).greater(0);

  rule.msg(
      'There are %d <a> tag without rel attribute.'
  );
  return rule;
};

/**
 * In head tag, there is no <title> tag
 * @return {Rule} rule object
 */
function inHeadNoTitle() {
  const condObj = new Cond();
  let parentCondObj = new Cond();
  parentCondObj = parentCondObj.tag('head').has(
      condObj.tag('title').exist());
  const rule = new Rule(parentCondObj).equal(0);

  rule.msg(
      'In <head> tag, There is no  <title> tag.'
  );
  return rule;
}

/**
 * In head tag, meta with name.name equal to descriptions
 * @return {Rule} rule object
 */
function inHeadMetaNameIsDescriptions() {
  const condObj = new Cond();
  let parentCondObj = new Cond();
  parentCondObj = parentCondObj.tag('head').has(
      condObj.tag('meta').attrib('name').exist('descriptions'));
  const rule = new Rule(parentCondObj).equal(0);

  rule.msg(
      'In <head> tag, There is no  <meta name=\"descriptions\" … /> tag.'
  );
  return rule;
}

/**
 * In head tag, meta with name.name equal to keywords
 * @return {Rule} rule object
 */
function inHeadMetaNameIsKeywords() {
  const condObj = new Cond();
  let parentCondObj = new Cond();
  parentCondObj = parentCondObj.tag('head').has(
      condObj.tag('meta').attrib('name').exist('keywords'));
  const rule = new Rule(parentCondObj).equal(0);

  rule.msg(
      'In <head> tag, There is no  <meta name=\"keywords\" … /> tag.'
  );
  return rule;
}

/**
 * There are more than num <strong> tag
 * @param {numbers} num threshold
 * @return {Rule} rule object
 */
function strongGreaterNum(num) {
  let condObj = new Cond();
  condObj = condObj.tag('strong').exist();
  const rule = new Rule(condObj).greater(num);

  rule.msg(
      'There are %d <strong> tag' + util.format('(more than %d).', num)
  );
  return rule;
}

/**
 * There are more than 1 <h1> tag
 * @return {Rule} rule object
 */
function h1Unique() {
  condObj = new Cond();
  condObj = condObj.tag('h1').exist();
  const rule = new Rule(condObj).greater(1);

  rule.msg(
      'There are %d <H1> tag(more than 1).'
  );
  return rule;
}

/**
 * <meta name=“robots” /> not existing
 * @return {Rule} rule object
 */
function metaNameRobotsNotExist() {
  condObj = new Cond();
  condObj = condObj.tag('meta').attrib('name').exist('robots');
  const rule = new Rule(condObj).equal(0);

  rule.msg(
      'There is no <meta name=“robots” />.'
  );
  return rule;
}

exports.imgWithoutAlt = imgWithoutAlt;
exports.aWithoutRel = aWithoutRel;
exports.inHeadMetaNameIsDescriptions = inHeadMetaNameIsDescriptions;
exports.inHeadNoTitle = inHeadNoTitle;
exports.inHeadMetaNameIsKeywords = inHeadMetaNameIsKeywords;
exports.strongGreaterNum = strongGreaterNum;
exports.h1Unique = h1Unique;
exports.metaNameRobotsNotExist = metaNameRobotsNotExist;
