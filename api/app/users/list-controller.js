var meta = require('../meta/controller');
var _ = require('lodash');
var base64 = require('base-64');

function ListController() {
  this.repository = require('./repository');
}

function get(req, res, next) {
  this.repository.getList(true, req.query, function(userList) {
    var response = {
        meta: meta.get(req),
        data: userList
    }
    res.status(200).json(response);
  });
}

function post(req, res, next) {
  var respository = this.repository;

  // If username is not passed in, a username key will be added to object
  // based upon name provided

  if (!_.has(req.body,'username')) {
    if (_.has(req.body,'name')) {
       req.body.username = req.body.name.split(' ').join('_').toLowerCase();
    }
  }

  if (!_.has(req.body,'password')) {
    req.body.password = base64.encode(req.body.username + ':kudos');
  }

  respository.get(req.body.username, true, function(user) {
      // A query is done to ensure the username does not exist, and a duplicate
      // username error is thrown if so
      if (user) {
        res.status(400).json({ error: "Duplicate user" });
      } else {
        // Create is done if all of those checks are good
        respository.create(req.body, true, function(user) {

          if(undefined === user) {
            res.status(400).json({ error: "Unable to create user" });
          } else {
            var response = {
                meta: meta.get(req),
                data: user
            }
            res.status(201).json(response);
          }
        });
      }

    });

}

ListController.prototype = {
  get: get,
  post: post
};

var listController = new ListController();
module.exports = listController;
