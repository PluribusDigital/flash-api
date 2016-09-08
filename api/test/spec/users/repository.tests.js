describe('User Repository Tests', function() {
  var userRepository;
  var userData;

  beforeEach(function() {
    userRepository = require('../../../app/users/repository');
    userData = {
      username: 'testuser',
      password: 'asdfasdfasdf',
      name: 'Test User',
      email: 'test.user@example.com',
      title: 'Test Title',
      organization: 'Test Org',
      department: 'Test Dept',
      role: 'Supervisor',
      supervisor_id: null
    };
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

  describe('create', function(){

    it('should return undefined on error', function(done){
      userRepository.create({}, true, function(user){
        expect(user).to.be.a('undefined');
        done();
      });
    });

    it('should return created user on success', function(done){
      userRepository.create(userData, true, function(user){
        expect(user).to.be.a('object');
        expect(user.name).to.eql('Test User');
        done();
      });
    });
  });

  describe('update', function(){
    var updateData;
    var testUser;

    beforeEach(function() {
      updateData = {
        id: null,
        username: 'testuserupdated',
        name: 'Test User Updated',
        title: 'Test Title Updated',
        organization: 'Test Org Updated',
        department: 'Test Dept Updated',
        role: 'Supervisor Updated',
        supervisor_id: null
      }
    });

    it('should return undefined on error', function(done){
      userRepository.update({}, true, function(user){
        expect(user).to.be.a('undefined');
        done();
      });
    });

    it('should return updated user on success', function(done){
      userRepository.create(userData, true, function(user){
        updateData.id = user.id;
        userRepository.update(updateData, true, function(updatedUser){
          expect(updatedUser).to.be.a('object');
          expect(updatedUser.name).to.eql('Test User Updated');
          done();
        });
      });
    });
  });

  describe('destroy', function(){
    it('should return undefined on error', function(done){
      userRepository.destroy(999999, function(result){
        expect(result).to.be.a('undefined');
        done();
      });
    });

    it('should return true on success', function(done){
      userRepository.create(userData, true, function(user){
        userRepository.destroy(user.id, function(result){
          expect(result).to.be.a('object');
          expect(result.id).to.eql(user.id);
          done();
        });
      });
    });
  });
});
