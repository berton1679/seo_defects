const Cond = require('./condition.js').Cond;
const Rule = require('./rule.js').Rule;
const seoRule = require('./seo_rule');
const seoParser = require('./seo_parser');
const seoStream = require('./seo_stream');


exports.Cond = Cond;

exports.Rule = Rule;

exports.imgWithoutAlt = seoRule.imgWithoutAlt;
exports.aWithoutRel = seoRule.aWithoutRel;
exports.inHeadMetaNameIsDescriptions = seoRule.inHeadMetaNameIsDescriptions;
exports.inHeadNoTitle = seoRule.inHeadNoTitle;
exports.inHeadMetaNameIsKeywords = seoRule.inHeadMetaNameIsKeywords;
exports.strongGreaterNum = seoRule.strongGreaterNum;
exports.h1Unique = seoRule.h1Unique;


exports.SeoParser = seoParser.SeoParser;
exports.SeoParserInputError = seoParser.SeoParserInputError;
exports.defaultDefectRule = seoParser.defaultDefectRule;

exports.consoleReadableStream = seoStream.consoleReadableStream;
exports.fileReadableStream = seoStream.fileReadableStream;
exports.fileWritableStream = seoStream.fileWritableStream;
exports.consoleWritableStream = seoStream.consoleWritableStream;

