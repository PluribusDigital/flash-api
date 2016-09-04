var userRepository = require('./repository');

function Controller() {}

function get(req, res, next) {
  userRepository.get(req.params.userid, true, function(user) {
    if(user === undefined) {
      res.status(404).json({ error: "User Not Found" });
    } else {
      var response = {
          meta: {
            params: {},
            user: "TBD",
            date: new Date()
          },
          data: user
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
