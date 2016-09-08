describe('User Request Tests', function() {
  describe('when non authorized', function () {
    it ('GET /v1/users should return 401', function (done) {
      chai.request(server)
      .get('/v1/users')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });

    it ('GET /v1/users/:username should return 401', function (done) {
      chai.request(server)
      .get('/v1/users/someuser')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });

    it ('POST /v1/users should return 401', function (done) {
      chai.request(server)
      .post('/v1/users')
      .send({})
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });

    it ('PUT /v1/users/:username should return 401', function (done) {
      chai.request(server)
      .post('/v1/users/someuser')
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
    var newUserData;
    var updateUserData;

    beforeEach(function(){
      var apiConfig = require('../../../app/config/api-config');
      apiKey = apiConfig.getValidKey();
      user = {
        username: 'gwashington',
        password: 'george1'
      };
      newUserData = {
        username: 'newUser',
        password: 'asdfasdfasdf',
        name: 'New User',
        email: 'new.user@example.com',
        title: 'New Title',
        organization: 'New Org',
        department: 'New Dept',
        role: 'New Supervisor',
        supervisor_id: null
      };
      updateUserData = {
        name: 'Updated User',
        title: 'Updated Title',
        organization: 'Updated Org',
        department: 'Updated Dept',
        role: 'Updated Supervisor',
        supervisor_id: null
      };
    });

    it ('GET /v1/users should return list of users', function (done) {
      chai.request(server)
      .get('/v1/users')
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

    it ('GET /v1/users/:username should return desired user', function (done) {
      chai.request(server)
      .get('/v1/users/gwashington')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.username).to.equal('gwashington');
        expect(res.body.meta).to.be.a('object');
        expect(res.body.meta.params.api_key).to.equal(apiKey);
        expect(res.body.meta.user).to.equal('gwashington');
        expect(res.body.meta.date).to.not.be.null;
        done();
      });
    });

    it ('GET /v1/users/:username should return 404 when user is not found', function (done) {
      chai.request(server)
      .get('/v1/users/someuser')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });

    it ('POST /v1/users should return 400 on error', function (done) {
      chai.request(server)
      .post('/v1/users')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .send({})
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });

    it ('POST /v1/users should return 201 on success', function (done) {
      chai.request(server)
      .post('/v1/users')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .send(newUserData)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        done();
      });
    });

    it ('PUT /v1/users/:username should return 400 on error', function (done) {
      chai.request(server)
      .put('/v1/users/tjefferson')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .send({})
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });

    it ('PUT /v1/users/:username should return 200 on success', function (done) {
      chai.request(server)
      .put('/v1/users/tjefferson')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .send(updateUserData)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data.name).to.eql('Updated User');
        done();
      });
    });
  });

});
