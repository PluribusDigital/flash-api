var _ = require('lodash');
var db = require('../config/db-config');

function Repository() {}

function getList(apiRepresentation, filters, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM kudo' + processFilters(filters), function (err, result) {
    if(err){
      return callback([]);
    }
    callback(result.rows);
  });
}

function get(id, apiRepresentation, callback) {
  db.query('SELECT ' + params(apiRepresentation) + ' FROM kudo WHERE id = $1', [id], function (err, result) {
    if(err){
      return callback(undefined);
    }
    callback(result.rows[0]);
  });
}

function create(kudo, apiRepresentation, callback) {

  db.query("INSERT INTO kudo (" + insertFields() + ") VALUES($1, $2, $3, $4, now()) RETURNING " + params(apiRepresentation),
   [kudo.nominee, kudo.nominator, kudo.category, kudo.comment], function (err, result) {
    if(err){
      return callback(undefined);
    }
    callback(result.rows[0]);
  });
}

function destroy(id, callback) {
  db.query("DELETE FROM kudo WHERE id=$1 RETURNING id", [id], function (err, result) {
    if(err){
      return callback(undefined);
    }
    callback(result.rows[0]);
  });
}

function insertFields(){
  return "nominee, nominator, category, comment, created_date";
}


function params(apiRepresentation) {
  var retVal = "*";

  if(apiRepresentation) {
    retVal = "id, nominee, nominator, category, comment, created_date";
  }

  return retVal;
}

function processFilters(filters) {
  var retVal = "";

  return retVal;
}

Repository.prototype = {
    getList: getList,
    get: get,
    create: create,
    destroy: destroy,
    params: params
};

var repository = new Repository();
module.exports = repository;
