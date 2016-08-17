
function UserListController() {
  this.userListService_ = require('../../../services/users/user-list-service');
}

function get(req, res, next) {
  var userList = this.userListService_.lookupUserList();

  res.status(200).json(userList);
}

UserListController.prototype = {
  get: get
};

var userListController = new UserListController();

module.exports = userListController;
