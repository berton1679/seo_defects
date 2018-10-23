const fs = require('fs');
const process = require('process');
/**
 * Create readable file stream
 * @param {string} filename input file name
 * @return {ReadableStream} stream
 */
function fileReadableStream(filename) {
  stream = fs.createReadStream(filename);
  return stream;
};

/**
 * Create stdin stream
 * @return {ReadableStream} process stdin
 */
function consoleReadableStream() {
  return process.stdin;
}

/**
 * Create writable file stream
 * @param {string} filename output file name
 * @return {WritableStream} stream
 */
function fileWritableStream(filename) {
  stream = fs.createWriteStream(filename);
  return stream;
}

/**
 * Create stdout stream
 * @return {WritableStream} process stdin
 */
function consoleWritableStream() {
  return process.stdout;
}

exports.consoleReadableStream = consoleReadableStream;
exports.fileReadableStream = fileReadableStream;
exports.fileWritableStream = fileWritableStream;
exports.consoleWritableStream = consoleWritableStream;
