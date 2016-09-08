var _ = require('lodash');
var db = require('../config/db-config');

function Repository() {}

function getList(apiRepresentation, filters, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM users' + processFilters(filters), function (err, result) {
    if(err){
      return callback([]);
    }
    callback(result.rows);
  });
}

function get(username, apiRepresentation, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM users WHERE username = $1', [username], function (err, result) {
    if(err){
      return callback(undefined);
    }
    callback(result.rows[0]);
  });
}

function create(user, apiRepresentation, callback) {
  db.query("INSERT INTO users (" + insertFields() + ") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING " + params(apiRepresentation), [user.username, user.password, user.name, user.email, user.title, user.organization, user.department, user.role, user.supervisor_id], function (err, result) {
    if(err){
      callback(undefined);
    }
    callback(result.rows[0]);
  });
}

function update(user, apiRepresentation, callback) {
  db.query("UPDATE users SET " + updateFields() + " WHERE id=$8 RETURNING " + params(apiRepresentation), [user.username, user.name, user.title, user.organization, user.department, user.role, user.supervisor_id, user.id], function (err, result) {
    if(err){
      callback(undefined);
    }
    callback(result.rows[0]);
  });
}

function destroy(id, callback) {
  db.query("DELETE FROM users WHERE id=$1 RETURNING id", [id], function (err, result) {
    if(err){
      callback(undefined);
    }
    callback(result.rows[0]);
  });
}

function insertFields(){
  return "username, password, name, email, title, organization, department, role, supervisor_id";
}

function updateFields(){
  return "username=$1, name=$2, title=$3, organization=$4, department=$5, role=$6, supervisor_id=$7";
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
    create: create,
    update: update,
    destroy: destroy,
    params: params,
    processFilters: processFilters
};

var repository = new Repository();

module.exports = repository;
