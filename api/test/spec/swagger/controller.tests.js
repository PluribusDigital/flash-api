
describe('Swagger Controller Tests', function() {

  // --------------------------------------------------------------------------
  // Mocks

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

    target = require('../../../app/swagger/controller');

  });

  // --------------------------------------------------------------------------
  // Tests

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(target.get).to.be.a('function');
      done();
    });



  });
});
