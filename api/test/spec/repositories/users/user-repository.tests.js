
describe('UserRepository Tests', function() {

  var userRepository;

  beforeEach(function() {
    userRepository = require('../../../../app/repositories/users/user-repository');
  });

  describe('getUserData()', function() {

    it('should get a list of users', function(done) {
      userRepository.getUserList(function(users) {
        expect(users.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should get a single user', function(done) {
      //var user = userRepository.getUser(1);
      //expect(user).to.deep.equal({id: 1, name: "Jon Minter"});
      done();
    });

  });
});
