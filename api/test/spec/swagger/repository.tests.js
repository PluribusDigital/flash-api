var proxyquire = require('proxyquire').noCallThru();

describe('Swagger Repository Tests', function() {

  // --------------------------------------------------------------------------
  // Mocks

  // --------------------------------------------------------------------------
  // Setup


  var target;

  beforeEach(function() {
    target = require('../../../app/swagger/repository');
  });

  describe('get', function() {

    it('should get swagger docs (json)', function(done) {
      target.get(function(swagger) {
        assert.equal(swagger.swagger,'2.0');
        done();
      });
    });

  });
});
