var api_config = require('./api-config');

function Authority() {
}

function checkForKey(req, res, next) {
  if( req.query.api_key == undefined ) {
    res.status(401).send('You must provide an API Key before accessing our service.');
  }
  else if(!api_config.checkForKey(req.query.api_key)) {
    res.status(401).send('Unrecognized key');
  }
  else {
    next();
  }
}

Authority.prototype = {
  checkForKey: checkForKey
};

var Authority = new Authority();

module.exports = Authority;
