# requestsync

Make synchronous web requests with the request module.  This is derived from the [sync-request module](https://github.com/ForbesLindesay/sync-request).

## Installation

    npm install requestsync

## Usage

```js
request(options)
```

e.g.

```js
var request = require('requestsync');
var options = {
  method: 'GET',
  url: 'http://example.com'
};
var res = request(options);
console.log(res.body);
```

**Options:**

For a list of options, please see [the options section for the request module](https://www.npmjs.com/package/request#requestoptions-callback).

**Returns:**

An object containing the following:

 - `err` - an error when applicable
 - `resp` - a serialized copy of a http.IncomingMessage object which will have missing functions and what not
 - `body` - the response body

## How is this possible?

Internally, this uses a separate worker process that is run using either [childProcess.spawnSync](http://nodejs.org/docs/v0.11.13/api/child_process.html#child_process_child_process_spawnsync_command_args_options) if available, or falling back to [spawn-sync](https://www.npmjs.org/package/spawn-sync) if not.  The fallback will attempt to install a native module for synchronous execution, and fall back to doing busy waiting for a file to exist.  All this ultimately means that the module is totally cross platform and does not require native code compilation support.

The worker then makes the actual request using [request](https://www.npmjs.org/package/request) so this has almost exactly the same API as that.

## TODO

 - Implement more of request module's convenience methods
 - Thorough testing of all the request options to verify everything is working between the parent and child process

## License

  MIT
