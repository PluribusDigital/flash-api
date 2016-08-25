
function UserListController() {
  this.userListService_ = require('../../../services/users/users-service');
}

function get(req, res, next) {
  this.userListService_.lookupUserList(function(userList) {
    var response = {
        meta: {
          params: {},
          user: "TBD",
          date: new Date()
        },
        data: userList
    }
    res.status(200).json(response);
  });
}

UserListController.prototype = {
  get: get
};

var userListController = new UserListController();

module.exports = userListController;
