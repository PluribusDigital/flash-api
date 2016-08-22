var auth = require('basic-auth');
var md5 = require('md5');
var api_config = require('./api-config');

function Authority() {
}

const AUTH_MISSING_STRING = "You must provide an API Key and Authorization before accessing our service."
const AUTH_ERROR_STRING   = "Authentication Failed";

function checkForKey(req, res, next) {
  if( req.query.api_key == undefined ) {
    res.status(401).send(AUTH_MISSING_STRING);
  }
  else if(!api_config.checkForKey(req.query.api_key)) {
    res.status(401).send(AUTH_ERROR_STRING);
  }
  else {
    next();
  }
}

function authenticate(req, res, next) {
  var userRepository_ = require('../repositories/users/user-repository');
  var credentials = auth(req);
  var apiRepresentation = false;

  if(req.method == "OPTIONS") {
    next();
  }
  else if(credentials != null) {
    console.log(JSON.stringify(credentials));
    userRepository_.getUser(credentials.name, apiRepresentation, function(user) {
      if(user != null && md5(credentials.pass.toLowerCase()) == user.password) {
        next();
      } else {
        res.status(401).send(AUTH_ERROR_STRING);
      }
    });
  } else {
    res.status(401).send(AUTH_MISSING_STRING);
  }
}

Authority.prototype = {
  checkForKey: checkForKey,
  authenticate: authenticate
};

var Authority = new Authority();

module.exports = Authority;
