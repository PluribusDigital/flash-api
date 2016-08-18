function Authority() {
}

function checkForKey(req, res, next) {
  if( req.query.api_key == undefined ) {
    res.status(401).send('You must provide an API Key before accessing our service.  More information can be found at http://example.org/foo/bar');
  }

  // A stub, obvs
  else if( req.query.api_key !== 'QWERTY' ) {
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
