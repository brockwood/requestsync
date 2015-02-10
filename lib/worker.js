'use strict';

var concat = require('concat-stream');
var request = require('request');
var JSON = require('./json-buffer');
var HttpsAgent = require('https').Agent;
var HttpAgent = require('http').Agent;

function handleResponse(error, response, body){
  process.stdout.write(JSON.stringify({
    err: error,
    resp: response,
    body: body
  }));
}

process.stdin.pipe(concat(function (stdin) {
  var req = JSON.parse(stdin.toString());

  if(req.options.agent){
  	var newAgent = null;
  	if(req.options.url.indexOf('https://') > -1){
  		newAgent = new HttpsAgent(req.options.agent.options);
  	} else {
  		newAgent = new HttpAgent(req.options.agent.options);
  	}
  	req.options.agent = newAgent;
  }
  request(req.options, handleResponse);
}));