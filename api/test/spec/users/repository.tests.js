describe('User Repository Tests', function() {
  var userRepository;

  beforeEach(function() {
    userRepository = require('../../../app/users/repository');
  });

  describe('get', function() {

    it('should get a list of users', function(done) {
      userRepository.getList(null, null, function(users) {
        expect(users.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should get a single user', function(done) {
      userRepository.get('gwashington', null, function(user) {
        expect(user).to.have.deep.property('username', 'gwashington');;
        done();
      });
    });

    it('should filter on a numeric supervisor_id', function(done) {
      expect(userRepository.processFilters({ "supervisor_id": 1 })).to.contain('supervisor_id = 1');
      done();
    });

    it('should ignore filter on a non-numeric supervisor_id', function(done) {
      expect(userRepository.processFilters({ "supervisor_id": "asdf" })).to.eql('');
      done();
    });

    it('should ignore filter on a null supervisor_id', function(done) {
      expect(userRepository.processFilters({ "supervisor_id": null })).to.eql('');
      done();
    });

  });
});
