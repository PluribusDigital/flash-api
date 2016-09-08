var authority = require('../config/authority');

function Controller() {}

function get(req) {
  this.params = req.query;
  this.user = authority.getCredentials(req).name;
  this.date = new Date();

  return this;
}


Controller.prototype = {
  get: get
};

var meta = new Controller();

module.exports = meta;
