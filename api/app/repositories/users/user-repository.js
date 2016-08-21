var _ = require('lodash');
var db = require('../../config/db-config');

function UserRepository() {
}

function getUserList(apiRepresentation, callback) {
  db.pool.query('SELECT ' + params(apiRepresentation) + ' FROM users', function (err, result) {
    callback(result.rows);
  });
}

function getUser(username, apiRepresentation, callback) {
  db.pool.query('SELECT ' + params(apiRepresentation) + ' FROM users WHERE username = \'' + username + '\'', function (err, result) {
    callback(result.rows[0])
  });
}

function params(apiRepresentation) {
  var retVal = "*";

  if(apiRepresentation) {
      retVal = "username, name, title, organization, department";
  }

  return retVal;
}

UserRepository.prototype = {
    getUserList: getUserList,
    getUser: getUser
};

var userRepository = new UserRepository();

module.exports = userRepository;
