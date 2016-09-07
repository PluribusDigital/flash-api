var _ = require('lodash');
var db = require('../config/db-config');

function Repository() {
}

function getList(apiRepresentation, filters, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM users' + processFilters(filters), function (err, result) {
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
      retVal = "id, username, name, title, organization, department, role, supervisor_id";
  }

  return retVal;
}

function processFilters(filters) {
  var retVal = "";

  if(filters !== null && filters.supervisor_id !== null && !isNaN(filters.supervisor_id)) {
      retVal += " WHERE supervisor_id = " + filters.supervisor_id;
  }

  return retVal;
}

Repository.prototype = {
    getList: getList,
    get: get,
    params: params,
    processFilters: processFilters
};

var repository = new Repository();

module.exports = repository;
