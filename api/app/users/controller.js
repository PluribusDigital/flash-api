var userRepository = require('./repository');
var meta = require('../meta/controller');

function Controller() {}

function get(req, res, next) {
  userRepository.get(req.params.userid, true, function(user) {
    if(undefined === user) {
      res.status(404).json({ error: "User Not Found" });
    } else {
      var response = {
          meta: meta.get(req),
          data: user
      }
      res.status(200).json(response);
    }
  });
}

function put(req, res, next) {
  userRepository.get(req.params.userid, true, function(user) {
    if(undefined === user) {
      res.status(404).json({ error: "User Not Found" });
    } else {
      req.body.id = user.id;
      userRepository.update(req.body, true, function(updatedUser) {
        if(undefined === updatedUser) {
          res.status(400).json({ error: "Unable to Update User" });
        } else {
          var response = {
              meta: meta.get(req),
              data: updatedUser
          }
          res.status(200).json(response);
        }
      });
    }
  });
}

function destroy(req, res, next) {
  userRepository.get(req.params.userid, true, function(user) {
    if(undefined === user) {
      res.status(404).json({ error: "User Not Found" });
    } else {
      userRepository.destroy(user.id, function(result) {
        if(undefined === result) {
          res.status(400).json({ error: "Unable to Delete User" });
        } else {
          res.status(204).send({});
        }
      });
    }
  });
}

Controller.prototype = {
  get: get,
  put: put,
  delete: destroy
};

var controller = new Controller();
module.exports = controller;
