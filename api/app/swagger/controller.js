function Controller() {}

function get(req, res, next) {
  var swagger = require('./swagger');
  res.status(200).json(swagger);
}

Controller.prototype = {
  get: get
};

var controller = new Controller();
module.exports = controller;
