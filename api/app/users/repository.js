var _ = require('lodash');
var db = require('../config/db-config');

function Repository() {
}

function getList(apiRepresentation, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM users', function (err, result) {
    callback(result.rows);
  });
}

function get(username, apiRepresentation, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM users WHERE username = \'' + username + '\'', function (err, result) {
    callback(result.rows[0])
  });
}

function params(apiRepresentation) {
  var retVal = "*";

  if(apiRepresentation) {
      retVal = "username, name, title, organization, department, role, supervisor_id";
  }

  return retVal;
}

Repository.prototype = {
    getList: getList,
    get: get
};

var repository = new Repository();

module.exports = repository;
