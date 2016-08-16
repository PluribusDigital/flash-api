
function UserListController() {
}

function get(req, res, next) {
  res.status(200).json({ hello: 'world' });
}

UserListController.prototype = {
  get: get
};

var userListController = new UserListController();

module.exports = userListController;
