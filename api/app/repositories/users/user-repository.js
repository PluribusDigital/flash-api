var _ = require('lodash');
var db = require('../../config/db-config');

function UserRepository() {
}

function getUserList(callback) {
  db.pool.query('SELECT * from users', function (err, result) {
    callback(result.rows);
  });
}

function getUser(username, callback) {
  db.pool.query('SELECT * from users WHERE username = \'' + username + '\'', function (err, result) {
    callback(result.rows[0])
  });
}

UserRepository.prototype = {
    getUserList: getUserList,
    getUser: getUser
};

var userRepository = new UserRepository();

module.exports = userRepository;
