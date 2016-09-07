var auth = require('basic-auth');
var md5 = require('md5');
var api_config = require('./api-config');
var userRepository_ = require('../users/repository');

function Authority() {
}

const AUTH_MISSING_STRING = "You must provide an API Key and Authorization before accessing our service."
const AUTH_ERROR_STRING   = "Authentication Failed";

function checkForKey(req, res, next) {
  if( req.query.api_key === undefined ) {
    res.status(401).json({ error: AUTH_MISSING_STRING });
  }
  else if(!api_config.checkForKey(req.query.api_key)) {
    res.status(401).json({ error: AUTH_ERROR_STRING });
  }
  else {
    next();
  }
}

function authenticate(req, res, next) {
  var credentials = getCredentials(req);
  var apiRepresentation = false;

  if(req.method === "OPTIONS") {
    next();
  }
  else if(credentials !== null) {
    userRepository_.get(credentials.name, apiRepresentation, function(user) {
      if(user !== undefined && md5(credentials.pass.toLowerCase()) === user.password) {
        next();
      } else {
        res.status(401).json({ error: AUTH_ERROR_STRING });
      }
    });
  } else {
    res.status(401).json({ error: AUTH_MISSING_STRING });
  }
}

function getCredentials(req) {
  return auth(req);
}

Authority.prototype = {
  checkForKey: checkForKey,
  authenticate: authenticate,
  getCredentials: getCredentials
};

var authority = new Authority();

module.exports = authority;
