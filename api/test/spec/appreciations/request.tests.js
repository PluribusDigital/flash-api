describe('Appreciation Request Tests', function() {
  describe('when non authorized', function () {
    it ('GET /v1/appreciations should return 401', function (done) {
      chai.request(server)
      .get('/v1/appreciations')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });

    it ('GET /v1/appreciations/:id should return 401', function (done) {
      chai.request(server)
      .get('/v1/appreciations/1')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });
  });

  describe('when authorized', function () {
    var apiKey;
    var user;

    beforeEach(function(){
      var apiConfig = require('../../../app/config/api-config');
      apiKey = apiConfig.getValidKey();
      user = {
        username: 'gwashington',
        password: 'george1'
      }
    });

    it ('GET /v1/appreciations should return list of appreciations', function (done) {
      chai.request(server)
      .get('/v1/appreciations')
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

    it ('GET /v1/appreciations/:id should return desired appreciation', function (done) {
      chai.request(server)
      .get('/v1/appreciations/101')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.title).to.equal('Thanks');
        expect(res.body.meta).to.be.a('object');
        expect(res.body.meta.params.api_key).to.equal(apiKey);
        expect(res.body.meta.user).to.equal('gwashington');
        expect(res.body.meta.date).to.not.be.null;
        done();
      });
    });

    it ('GET /v1/appreciations/:id should return 404 when appreciation is not found', function (done) {
      chai.request(server)
      .get('/v1/appreciations/1')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });

    it ('POST /v1/appreciations/ should return 500 when appreciation cannot be created', function (done) {
      chai.request(server)
      .post('/v1/appreciations')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .send({})
      .end(function(err, res) {
        expect(res).to.have.status(500);
        done();
      });
    });

    it ('POST /v1/appreciations/ should return 201 when appreciation is created', function (done) {
      var postData = {
        from_user: 1,
        to_user: 5,
        date_given: "09/07/2016",
        title: "Some Title",
        description_of_conduct: "Some text here",
        positive_effect_on_others: "More text here",
        status: "DRAFT"
      }
      chai.request(server)
      .post('/v1/appreciations')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .send(postData)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        done();
      });
    });
  });

});
