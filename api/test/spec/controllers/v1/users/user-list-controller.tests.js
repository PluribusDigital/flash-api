var proxyquire = require('proxyquire').noCallThru();

describe('UserListController Tests', function() {

  // --------------------------------------------------------------------------
  // Mocks

  var serviceMocks = {
    lookupUserList: function(callback) { callback({}); }
  };

  // --------------------------------------------------------------------------
  // Setup

  var userListController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    userListController = require('../../../../../app/controllers/v1/users/user-list-controller');
    userListController.userListService_ = serviceMocks;
  });

  // --------------------------------------------------------------------------
  // Tests

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(userListController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      userListController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
      userListController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
