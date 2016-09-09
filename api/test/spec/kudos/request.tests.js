describe('Kudo Request Tests', function() {
  var kudoRepository;

  beforeEach(function() {
    kudoRepository = require('../../../app/kudos/repository');
  });

  describe('when non authorized', function () {
    it ('GET /v1/kudos should return 401', function (done) {
      chai.request(server)
      .get('/v1/kudos')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });

    it ('GET /v1/kudos/:id should return 401', function (done) {
      chai.request(server)
      .get('/v1/kudos/1')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });

    it ('POST /v1/kudos should return 401', function (done) {
      chai.request(server)
      .post('/v1/kudos')
      .send({})
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });
  });

  describe('when authorized', function () {
    var apiKey;
    var user;
    var newKudoData;

    beforeEach(function(){
      var apiConfig = require('../../../app/config/api-config');
      apiKey = apiConfig.getValidKey();
      user = {
        username: 'gwashington',
        password: 'george1'
      };
      newKudoData = {
        nominee: 1,
        nominator: 2,
        category: 'Teamwork',
        comment: 'Great job'
      };
    });

    it ('GET /v1/kudos should return list of kudos', function (done) {
      chai.request(server)
      .get('/v1/kudos')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).to.be.a('array');
        expect(res.body.meta).to.be.a('object');
        expect(res.body.meta.params.api_key).to.equal(apiKey);
        expect(res.body.meta.user).to.equal('gwashington');
        expect(res.body.meta.date).to.not.be.null;
        done();
      });
    });

    it ('GET /v1/kudos/:id should return desired kudo', function (done) {
      chai.request(server)
      .get('/v1/kudos/101')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.id).to.equal(101);
        expect(res.body.meta).to.be.a('object');
        expect(res.body.meta.params.api_key).to.equal(apiKey);
        expect(res.body.meta.user).to.equal('gwashington');
        expect(res.body.meta.date).to.not.be.null;
        done();
      });
    });

    it ('GET /v1/kudos/:id should return 404 when kudo is not found', function (done) {
      chai.request(server)
      .get('/v1/kudos/99999999')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });

    it ('POST /v1/kudos should return 201 on success', function (done) {
      chai.request(server)
      .post('/v1/kudos')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .send(newKudoData)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.nominee).to.eql(1);
        expect(res.body.data.category).to.eql('Teamwork');
        done();
        kudoRepository.destroy(res.body.data.id, function(result){});
      });
    });

  });
});
