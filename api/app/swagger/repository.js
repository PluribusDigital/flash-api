var _ = require('lodash');
var async = require('async');
var path = require('path');
var glob = require('glob');
var $RefParser = require('json-schema-ref-parser');

function Repository() {
}

function get(callback) {
  var swagger = {};

  swagger.swagger = '2.0';
  swagger.info = {version: "0.0.0", title: "Flash APIs"};
  swagger.tags = [];
  swagger.paths = {};
  swagger.definitions = {};

  var jsonSchemaList = glob.sync(path.join(__dirname, '/../../schema/**/*.json'));

  var jsonSchemas = {};

  async.each(jsonSchemaList,
    function (schemaFile, callback) {
      var jsonSchemaFilePath = schemaFile;

      $RefParser.dereference(jsonSchemaFilePath, function (err, schema) {
        if (err) throw new Error (err);
        jsonSchemas[schema.name] = schema;
        callback();
      })

    },
    function (err) {

      if (err) {
        res.status(500);
        res.json({error: err});
      }

      swagger.paths['/users'] = {};
      swagger.paths['/users/{username}'] = {};

      swagger.paths['/users'].get = {
        tags: ['users'],
        summary: "Get list of users",
        description: "",
        parameters: [

        ],
       responses: {
         200: {
           description: "OK",
           schema: jsonSchemas.user_list
         }
       }
      }

      swagger.paths['/users/{username}'].get = {
        tags: ['users'],
        summary: "Get user instance",
        description: "",
        parameters: [
          {
            name: "username",
            in: "path",
            description: "",
            required: true,
            type: "string"
          }
        ],
       responses: {
         200: {
           description: "OK",
           schema: jsonSchemas.user_instance
         }
       }
      }

      callback(swagger);

    });


}

Repository.prototype = {
    get: get
};

var repository = new Repository();

module.exports = repository;
