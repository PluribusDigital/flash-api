var _ = require('lodash');
var db = require('../../config/db-config');

function UserRepository() {
}

var userList = [
  {
    id: 1,
    name: "Jon Minter"
  },
  {
    id: 2,
    name: "Trey White"
  }
];

function getUserList() {
  return userList;
}

function getUser(id) {
  var user = _.filter(userList, ['id', id]);
  if (user.length > 0) {
    return user[0];
  }
  return null;
}

UserRepository.prototype = {
    getUserList: getUserList,
    getUser: getUser
};

var userRepository = new UserRepository();

module.exports = userRepository;
