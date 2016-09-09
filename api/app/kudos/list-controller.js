var meta = require('../meta/controller');

function ListController() {
  this.repository = require('./repository');
}

function get(req, res, next) {
  this.repository.getList(true, req.query, function(kudosList) {
    var response = {
        meta: meta.get(req),
        data: kudosList
    }
    res.status(200).json(response);
  });
}

function post(req, res, next) {
  this.repository.create(req.body, true, function(kudos) {
    if(undefined === kudos) {
      res.status(400).json({ error: "Unable to create kudos" });
    } else {
      var response = {
          meta: meta.get(req),
          data: kudos
      }
      res.status(201).json(response);
    }
  });
}

ListController.prototype = {
  get: get,
  post: post
};

var listController = new ListController();
module.exports = listController;
