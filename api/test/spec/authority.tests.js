var proxyquire = require('proxyquire').noCallThru();

describe('Authentication', function() {

  // --------------------------------------------------------------------------
  // Mocks

  var apiConfigMocks = {
    checkForKey: function(key) { return key == 'BAR'; }
  };

  // --------------------------------------------------------------------------
  // Setup

  var target;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = { query: {} };
    res = { status: function(code) { return { send: function(obj) {} }} };
    next = sinon.spy();

    sinon.spy(res, "status");

    target = proxyquire('../../app/config/authority', {
      './api-config': apiConfigMocks
    });
  });

  // --------------------------------------------------------------------------
  // Tests

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
      req.query.api_key = 'BAR';

      target.checkForKey(req, res, next);
      expect(next.callCount).to.equal(1);
      expect(res.status.callCount).to.equal(0);
      done();
    });
  });
});
