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
        }, {
          id: 2,
          name: "Trey White",
          supervisor_id: 1
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
      target.getList(null, null, function(users) {
        expect(users.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should get a single user', function(done) {
      target.processFilters(null);
      target.get('gwashington', null, function(user) {
        expect(user).to.deep.equal({id: 1, name: "Jon Minter"});
        done();
      });
    });

    it('should filter on a numeric supervisor_id', function(done) {
      expect(target.processFilters({ "supervisor_id": 1 })).to.contain('supervisor_id = 1');
      done();
    });

    it('should ignore filter on a non-numeric supervisor_id', function(done) {
      expect(target.processFilters({ "supervisor_id": "asdf" })).to.eql('');
      done();
    });

    it('should ignore filter on a null supervisor_id', function(done) {
      expect(target.processFilters({ "supervisor_id": null })).to.eql('');
      done();
    });

  });
});
