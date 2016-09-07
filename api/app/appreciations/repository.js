var _ = require('lodash');
var db = require('../config/db-config');

function Repository() {
}

function getList(apiRepresentation, filters, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM appreciation' + processFilters(filters), function (err, result) {
    callback(result.rows);
  });
}

function get(id, apiRepresentation, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM appreciation WHERE id = \'' + id + '\'', function (err, result) {
    callback(result.rows[0])
  });
}

function post (apprecObj, callback) {

  var sql = 'INSERT INTO appreciation(from_user, to_user, date_given, description_of_conduct, positive_effect_on_others, status, title) VALUES ';
  sql = sql + ' (' + apprecObj.from_user + ',';
  sql = sql + apprecObj.to_user + ',';
  sql = sql + '\'' + apprecObj.date_given + '\',';
  sql = sql + '\'' + apprecObj.description_of_conduct + '\',';
  sql = sql + '\'' + apprecObj.positive_effect_on_others + '\',';
  sql = sql + '\'' + apprecObj.status + '\',';
  sql = sql + '\'' + apprecObj.title + '\'';
  sql = sql + ')';

  db.query(sql, function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });

}

function params(apiRepresentation) {
  var retVal = "*";

  /*
  if(apiRepresentation) {
      retVal = "from_user, to_user, date_given, title, description_of_conduct, positive_effect_on_others, status";
  }
  */

  return retVal;
}

function processFilters(filters) {
  var retVal = "";
  /*
  if(filters !== null && filters.supervisor_id !== null && !isNaN(filters.supervisor_id)) {
      retVal += " WHERE supervisor_id = " + filters.supervisor_id;
  }
  */

  return retVal;
}

Repository.prototype = {
    getList: getList,
    get: get,
    post: post,
    params: params,
    processFilters: processFilters
};

var repository = new Repository();

module.exports = repository;
