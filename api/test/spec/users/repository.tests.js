var proxyquire = require('proxyquire').noCallThru();

describe('User Repository Tests', function() {

  // --------------------------------------------------------------------------
  // Mocks

  var dbMocks = {
    query: function(string, fn) {
      var data = {
        rows: [{
          id: 1,
          name: "Jon Minter"
      }]};

      fn(null, data);
    }
  };

  // --------------------------------------------------------------------------
  // Setup


  var target;

  beforeEach(function() {
    target = proxyquire('../../../app/users/repository', {
      '../config/db-config': dbMocks
    });
  });

  describe('get', function() {

    it('should get a list of users', function(done) {
      target.getList(null, function(users) {
        expect(users.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should get a single user', function(done) {
      target.get('gwashington', null, function(user) {
        expect(user).to.deep.equal({id: 1, name: "Jon Minter"});
        done();
      });
    });

  });
});
