describe('User Repository Tests', function() {
  var kudoRepository;
  var kudoData;

  beforeEach(function() {
    kudoRepository = require('../../../app/kudos/repository');
    kudoData = {
      nominee: 1,
      nominator: 2,
      category: 'Teamwork',
      comment: 'This is a comment'
    };
  });

  describe('get', function() {

    it('should get a list of kudos', function(done) {
      kudoRepository.getList(null, null, function(kudos) {
        expect(kudos.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should get a single kudo', function(done) {
      kudoRepository.get(101, null, function(kudo) {
        expect(kudo).to.have.deep.property('nominee', 2);
        done();
      });
    });

  });

  describe('create', function(){
    it('should return created kudo on success', function(done){
      kudoRepository.create(kudoData, true, function(kudo){
        expect(kudo).to.be.a('object');
        expect(kudo.nominee).to.eql(1);
        done();
        kudoRepository.destroy(kudo.id, function(result){});
      });
    });
  });

});
