var _ = require('lodash');
var db = require('../../config/db-config');

function UserRepository() {
}

function getUserList(callback) {
  db.pool.query('SELECT username, name, title, organization, department from users', function (err, result) {
    callback(result.rows);
  });
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
