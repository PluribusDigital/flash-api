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


function post(req, res, next) {

  kudosRepository.create(req.body, true, function(kudosResult) {
    if(undefined === kudosResult) {
      res.status(400).json({ error: "Unable to create kudos" });
    } else {
      var response = {
          meta: meta.get(req),
          data: kudosResult
      }
      res.status(200).json(response);
    }
  });

}


Controller.prototype = {
  get: get,
  post: post
};

var controller = new Controller();
module.exports = controller;
