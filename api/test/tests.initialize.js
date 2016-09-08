beforeEach(function() {
  global.chai = require('chai');
  global.chaiHttp = require('chai-http');
  global.expect = global.chai.expect;
  global.sinon = require('sinon');
  global.assert = require('assert');
  global.server = require('../app/config/worker-config');

  global.chai.use(global.chaiHttp);
});
