/** server.js
 * Server for a CAS client
 */

// Constants
const PORT = 3000;

// Requires
var fs = require('fs');
var http = require('http');
var express = require('express');
var config = reuire('./config.json');

// The Express app
var app = express();

// Serve files from public folder
app.use(express.static('public'));

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}

var server = https.createServer(options, app);

var authCAS = require('auth-cas');
var auth = new AuthCAS(config.host, config.casHost)

// Start the server
app.listen(PORT, function(){
  console.log(PORT);
});
