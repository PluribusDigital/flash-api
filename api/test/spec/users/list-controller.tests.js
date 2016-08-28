var proxyquire = require('proxyquire').noCallThru();

describe('User List Controller Tests', function() {

  // --------------------------------------------------------------------------
  // Mocks

  var repositoryMock = {
    getList: function(apiRepresentation, callback)  { callback({}); }
  };

  // --------------------------------------------------------------------------
  // Setup

  var target;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    target = require('../../../app/users/list-controller');
    target.repository = repositoryMock;
  });

  // --------------------------------------------------------------------------
  // Tests

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(target.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      target.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
      target.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});