var kudosRepository = require('./repository');
var meta = require('../meta/controller');

function Controller() {}

function get(req, res, next) {
  kudosRepository.get(req.params.kudosid, true, function(kudos) {
    if(undefined === kudos) {
      res.status(404).json({ error: "Kudos Not Found" });
    } else {
      var response = {
          meta: meta.get(req),
          data: kudos
      }
      res.status(200).json(response);
    }
  });
}

Controller.prototype = {
  get: get
};

var controller = new Controller();
module.exports = controller;
