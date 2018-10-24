# SEO Defect Parser
[![Build Status](https://travis-ci.org/berton1679/seo_defects.svg?branch=master)](https://travis-ci.org/berton1679/seo_defects)
[![Coverage Status](https://coveralls.io/repos/github/berton1679/seo_defects/badge.svg?branch=master)](https://coveralls.io/github/berton1679/seo_defects?branch=master)

[![NPM](https://nodei.co/npm/seo_defects_sb.png)](https://nodei.co/npm/seo_defects_sb/)
<!--[![NPM](https://nodei.co/npm-dl/seo_defects_sb.png?height=3)](https://nodei.co/npm/seo_defects_sb/)-->
A seo defect parser. The parser could detect the seo defect rule.


## Installation
```
npm install seo_defects_sb
```

## Example

* Check the file `test.html` by the default rule, and output to `STDOut`

```javascript
const seoDefects = require('seo_defects_sb');

const parser = new seoDefects.SeoParser();

parser.init(
    seoDefects.fileReadableStream('test.html'),
    seoDefects.consoleWritableStream()
);

parser.parse(function() {
    console.log('parse end');
})
```



## API Readable/Writable Stream
### fileReadableStream(_filename_)
``` javascript
/**
 * Create readable file stream
 * @param {string} filename input file name
 * @return {ReadableStream} stream
 */
```
### consoleReadableStream()
``` javascript
/**
 * Create stdin stream
 * @return {ReadableStream} process stdin
 */
```
### fileWritableStream(_filename_)
``` javascript
/**
 * Create writable file stream
 * @param {string} filename output file name
 * @return {WritableStream} stream
 */
```
### consoleWritableStream()
``` javascript
/**
 * Create stdout stream
 * @return {WritableStream} process stdin
 */
```

## SeoParser

### SeoParser.init(_input_, _output_, _rules_=_null_)

``` javascript
/**
 * init input and output streams, defect rules
 * @param {readableStream} input
 * @param {WritableStream} output
 * @param {Rule} rules, if null, check by default rules
 * @throws {SeoParserInputError} invalid typeof streams
 */
```

### SeoParser.parse(_completeCb_=_null_)

``` javascript
/**
 * Start to parse
 * @param {function} completeCb complete callback
 */
```

Default rules:
1. Detect if any \<img /\> tag without alt attribute(__imgWithoutAlt()__)
2. Detect if any <a \/> tag without rel attribute(__aWithoutRel()__)
3. In \<head> tag
* Detect if header doesn’t have \<title> tag(__inHeadNoTitle()__)
* Detect if header doesn’t have \<meta name=“descriptions” … /> tag(__inHeadMetaNameIsDescriptions()__)
* Detect if header doesn’t have \<meta name=“keywords” … /> tag(__inHeadMetaNameIsKeywords()__)
4. Detect if there’re more than _{num}_ \<strong> tag in HTML(__strongGreaterNum(_num_)__) 
5. Detect if a HTML have more than one \<H1> tag(__h1Unique()__)

Package defined rules:
1. Detect if \<meta name=“robots” /> does not exist(__metaNameRobotsNotExist()__)

## Rule
A object decides whether to write the error message to the writable stream.

### Rule(_condition_)
```javascript
/**
 * Constructor
* @param {Cond} condition, the condition to be checked
*/
```

### Rule.equal(_val_), Rule.less(_val_), Rule.greater(_val_)

```javascript
/**
 * Check the num of counts which satify the condition
 * @param {number} val
 * @return {Rule} rule object
 */
```

### Rule.msg(_val_)

``` javascript
/**
 * Set error message
 * @param {string} val, error message to be written
 */
```

## Cond

### Cond.tag(_tag_)

``` javascript
/**
 * Set html tag, the condition want to check
 * @param {string} tag
 * @return {Cond} condition object
 */
```

### Cond.attrib(_name_)

``` javascript
/**
 * Set attribute, the condition want to check
 * @param {string} name
 * @return {Cond} condition object
 */
```

### Cond.exist(_val_=_null_), Cond.notExist(_val_=_null_)

``` javascript
/**
 * Set attribute value(default null), the condition want to check
 * @param {string} val, attribute value
 * @return {Cond} condition object
 */
```

### Cond.has(_cond_)
``` javascript
/**
 * A nested condition pattern
 * @param {Cond} cond
 * @return {Cond} condition  object
 */
```

## User-defined Rule
* Detect if any <meta \/> tag with name attribute, and its value equal to 'test' exists.

``` javascript
let condObj = new Cond();
condObj = condObj.tag('meta').attrib('name').exist('test');
const rule = new Rule(condObj).greater(0);
```

* In <p\> tag, detect if <span\> tag with style attribute does not exists.

``` javascript
const condObj = new Cond();
let parentCondObj = new Cond();
parentCondObj = parentCondObj.tag('p').has(
    condObj.tag('span').attrib('style').exist());
const rule = new Rule(parentCondObj).equal(0);
```

