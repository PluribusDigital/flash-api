var api_config = require('../../app/config/api-config.js');

describe('Authentication', function() {

  var target;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = { query: {} };
    res = { status: function(code) { return { send: function(obj) {} }} };
    next = sinon.spy();

    sinon.spy(res, "status");

    target = require('../../app/config/authority');
  });

  describe('API KEY', function() {

    it('rejects the url with a missing API KEY', function(done) {
      target.checkForKey(req, res, next);
      expect(res.status.calledWith(401)).to.equal(true);
      expect(next.callCount).to.equal(0);
      done();
    });

    it('rejects the url with an incorrect API KEY', function(done) {
      req.query.api_key = 'FOO';
      target.checkForKey(req, res, next);
      expect(res.status.calledWith(401)).to.equal(true);
      expect(next.callCount).to.equal(0);
      done();
    });

    it('allows the url through with a valid API KEY', function(done) {
      req.query.api_key = api_config.getValidKey();

      // In this case there are NO valid keys
      if(req.query.api_key !== false) {
        target.checkForKey(req, res, next);
        expect(res.status.callCount).to.equal(0);
        expect(next.callCount).to.equal(1);
      }

      done();
    });
  });
});
