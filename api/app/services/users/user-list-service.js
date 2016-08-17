function UserListService() {
    this.userRepository_ = require('../../repositories/users/user-repository');
}

function lookupUserList() {
    return this.userRepository_.getUserList();
}

UserListService.prototype = {
    lookupUserList : lookupUserList
};

var userListService = new UserListService();

module.exports = userListService;
