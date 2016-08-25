
function Controller() {
  this.repository = require('./repository');
}

function get(req, res, next) {
  this.repository.get(req.params.userid, null, function(user) {
    if(user == null) {
      res.status(404).send("User Not Found");
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
