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
  this.repository.create(req.body, true, function(kudosResult) {
    if(undefined === kudosResult) {
      res.status(400).json({ error: "Unable to create kudo" });
    } else {
      var response = {
          meta: meta.get(req),
          data: kudosResult
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
