
function UsersController() {
  this.userListService_ = require('../../../services/users/users-service');
}

function get(req, res, next) {
  this.userListService_.lookupUser(req.params.userid, function(user) {
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

UsersController.prototype = {
  get: get
};

var usersController = new UsersController();

module.exports = usersController;
