'use strict';

var concat = require('concat-stream');
var request = require('request');
var JSON = require('./json-buffer');

function handleResponse(error, response, body){
  process.stdout.write(JSON.stringify({
    err: error,
    resp: response,
    body: body
  }));
}

process.stdin.pipe(concat(function (stdin) {
  var req = JSON.parse(stdin.toString());
  request(req.options, handleResponse);
}));