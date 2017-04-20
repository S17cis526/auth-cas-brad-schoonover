var http = require('http');
var config = require('./config.json');
var assert = require('assert');
var authCAS = require('../auth_cas.js');



it('A host must be specified', function()
{
    assert.throws(
      () => {
        new authCAS();
      },
      /Host must be specified/
    );
    assert.throws(
      ()=> {
        new authCAS(undefined);
    },/Host must be specified/
  );
});

it('A CAS host must be specified', function(){
  assert.throws(
    () => { new authCAS('https://cashost.com')},
    /CAS Host must be specified/
  )
});

it('visiting the login page should redirect to the CAS server page', function(done){
  http.get(config.host + '/login', function(res){
    assert.equals(res.statusCode, 302);
    var redirect = url.parse(res.headers.location);
    var expected = url.parse(config.casHost);
    var service = encodeURIComponent(config.host + '/login');
    assert.equal(location.protocol, expected.protocol);
    assert.equal(location.hostname, expected.hostname);
    assert.equal(location.port, expected.port);
    assert.equal(location.pathname, '/login');
    assert.equal(location.search, '?servic=' + service)
  })
})
