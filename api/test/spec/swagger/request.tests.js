describe('Swagger Request Tests', function() {
  it ('GET /v1/', function (done) {
    chai.request(server)
    .get('/v1/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
