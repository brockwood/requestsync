'use strict';

var fs = require('fs');
var spawnSync = require('child_process').spawnSync || require('spawn-sync');
require('concat-stream');
require('request');
var JSON = require('./lib/json-buffer');

Function('', fs.readFileSync(require.resolve('./lib/worker.js'), 'utf8'));

module.exports = doRequest;
function doRequest(options) {
  var req = JSON.stringify({
    options: options
  });
  var res = spawnSync('node', [require.resolve('./lib/worker.js')], {input: req});
  if (res.status !== 0) {
    throw new Error(res.stderr.toString());
  }
  if (res.error) {
    if (typeof res.error === 'string') res.error = new Error(res.error);
    throw res.error;
  }
  return JSON.parse(res.stdout);
}
