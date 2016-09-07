describe('Appreciation Repository Tests', function() {
  var appeciationRepository;

  beforeEach(function() {
    appeciationRepository = require('../../../app/appreciations/repository');
  });

  describe('get', function() {

    it('should get a list of appreciations', function(done) {
      appeciationRepository.getList(null, null, function(appreciations) {
        expect(appreciations.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should get a single appreciation', function(done) {
      appeciationRepository.get(101, true, function(appreciation) {
        expect(appreciation).to.have.deep.property('title', 'Thanks');
        done();
      });
    });

  });

  describe('post', function() {
    it('should return created object', function(done) {
      var appreciationData = {
        from_user: 1,
        to_user: 5,
        date_given: "09/07/2016",
        title: "Some Title",
        description_of_conduct: "Some text here",
        positive_effect_on_others: "More text here",
        status: "DRAFT"
      }
      appeciationRepository.post(appreciationData, function(err, appreciation) {
        expect(appreciation).to.be.a('object');
        done();
      });
    });
  });
});
