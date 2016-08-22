var proxyquire = require('proxyquire').noCallThru();

describe('UserRepository Tests', function() {

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


  var userRepository;

  beforeEach(function() {
    userRepository = proxyquire('../../../../app/repositories/users/user-repository', {
      '../../config/db-config': dbMocks
    });
  });

  describe('getUserData()', function() {

    it('should get a list of users', function(done) {
      userRepository.getUserList(null, function(users) {
        expect(users.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should get a single user', function(done) {
      userRepository.getUser('gwashington', null, function(user) {
        expect(user).to.deep.equal({id: 1, name: "Jon Minter"});
        done();
      });
    });

  });
});
