const htmlparser = require('htmlparser2');
const stream = require('stream');
const seoRule = require('./seo_rule.js');

/** Input error class */
class SeoParserInputError extends Error {
  /**
   * @param {string} msg error message
   */
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
  }
}

/** Seo Parser class*/
class SeoParser {
  /** constructor */
  constructor() {
    this._inputStream = null;
    /** Default defect rules */
    this._rules = [
      seoRule.aWithoutRel(),
      seoRule.h1Unique(),
      seoRule.imgWithoutAlt(),
      seoRule.inHeadMetaNameIsDescriptions(),
      seoRule.inHeadMetaNameIsKeywords(),
      seoRule.inHeadNoTitle(),
      seoRule.strongGreaterNum(15),
    ];
    this._outputStream = null;
  }
  /**
   * init input and output streams, defect rules
   * @param {readableStream} input
   * @param {WritableStream} output
   * @param {Rule} rules
   * @throws {SeoParserInputError} invalid typeof streams
   */
  init(input, output, rules=null) {
    if (!(input instanceof stream.Readable)) {
      throw new SeoParserInputError('invalid input type(readable stream)');
    }

    if (!(output instanceof stream.Writable)) {
      throw new SeoParserInputError('invalid output type(writable stream)');
    }

    if (rules != null) {
      this._rules = rules;
    }
    this._inputStream = input;
    this._outputStream = output;
  }

  /**
   * Start to parse
   * @param {function} completeCb complete callback
   */
  parse(completeCb = null) {
    const parser = new htmlparser.Parser(
        {
          onopentag: function(name, attribs) {
            this._rules.forEach(function(rule) {
              rule.openTag(name, attribs);
            });
          }.bind(this),
          onclosetag: function(tagname) {
            this._rules.forEach(function(rule) {
              rule.closeTag(tagname);
            });
          }.bind(this),
        },
        {
          decodeEntities: true,
          lowerCaseTags: true,
          lowerCaseAttributeNames: true,
        });
    this._inputStream
        .on('data', function(chunck) {
          parser.write(chunck);
        })
        .on('end', function() {
          parser.end();

          this._rules.forEach(function(rule) {
            rule.check(this._outputStream);
          }, this);

          if (completeCb != null) {
            completeCb();
          }
        }.bind(this));
  }
}

exports.SeoParser = SeoParser;
exports.SeoParserInputError = SeoParserInputError;
