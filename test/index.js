var request = require('../')

// Test GET request
console.log("GET'ing http://nodejs.org...");
var options = {
	method: 'GET',
	url: 'http://nodejs.org'
};
var res = request(options);

console.log("Response code: ", res.resp.statusCode);
console.log("Reponse Body Length: ", res.body.length);

// Test HTTPS POST request
console.log("POST'ing to https://talk.to/...");
options = {
	method: 'POST',
	url: 'https://talk.to/',
	body: '<body/>'
};
var res = request(options);

console.log("Response code: ", res.resp.statusCode);
console.log("Reponse Body Length: ", res.body.length);

console.log("GET'ing https://apache.org (which should fail)...");
var errored = false;
try {
  // Test unauthorized HTTPS GET request
  options = {
  	method: 'GET',
  	url: 'https://apache.org',
        rejectUnauthorized: true
  };
  var res = request(options);
  console.log("Response code: ", res.resp.statusCode);
  console.log("Reponse Body: ", res.body);
  errored = true;
} catch(ex) {
  console.log("Successully rejected unauthorized host: https://apache.org/");
}
if (errored)
  throw new Error('Should have rejected unauthorized https get request');

process.exit(0);
