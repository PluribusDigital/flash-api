function UserListService() {
    this.userRepository_ = require('../../repositories/users/user-repository');
}

function lookupUserList(callback) {
    return this.userRepository_.getUserList(callback);
}

UserListService.prototype = {
    lookupUserList : lookupUserList
};

var userListService = new UserListService();

module.exports = userListService;
