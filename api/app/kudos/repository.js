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

function create(kudos, apiRepresentation, callback) {

  db.query("INSERT INTO kudo (" + insertFields() + ") VALUES($1, $2, $3, $4, now()) RETURNING " + params(apiRepresentation),
   [kudos.nominee, kudos.nominator, kudos.category, kudos.comment], function (err, result) {
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
    params: params
};

var repository = new Repository();
module.exports = repository;
