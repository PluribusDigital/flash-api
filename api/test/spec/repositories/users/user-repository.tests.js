var proxyquire = require('proxyquire').noCallThru();

describe('UserRepository Tests', function() {

  // --------------------------------------------------------------------------
  // Mocks

  var dbMocks = {
    pool: {
      query: function(string, fn) {
        var data = {
          rows: [{
            id: 1,
            name: "Jon Minter"
        }]};

        fn(null, data);
      }
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
      userRepository.getUserList(true, function(users) {
        expect(users.length).to.be.greaterThan(0);
        done();
      });
    });

    xit('should get a single user', function(done) {
      var user = userRepository.getUser(1);
      expect(user).to.deep.equal({id: 1, name: "Jon Minter"});
      done();
      pending('Not Currently Implemented');
    });

  });
});
