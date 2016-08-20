function UserListService() {
    this.userRepository_ = require('../../repositories/users/user-repository');
}

function lookupUserList(callback) {
    return this.userRepository_.getUserList(callback);
}

function lookupUser(username, callback) {
    return this.userRepository_.getUser(username, callback);
}

UserListService.prototype = {
    lookupUserList: lookupUserList,
    lookupUser: lookupUser
};

var userListService = new UserListService();

module.exports = userListService;
