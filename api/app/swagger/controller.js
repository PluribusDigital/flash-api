
function Controller() {
  this.repository = require('./repository');
}

function get(req, res, next) {

  this.repository.get(function(swagger) {
    swagger.hostname = req.headers.host + '/v1';
    swagger.schemes = ["http"];
    res.status(200).json(swagger);
  });

}

Controller.prototype = {
  get: get
};

var controller = new Controller();

module.exports = controller;
