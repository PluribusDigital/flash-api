var _ = require('lodash');
var db = require('../config/db-config');

function Repository() {
}

function get(callback) {
  this.swagger = {swagger: '2.0'};
  this.swagger.info = {version: "0.0.0", title: "Flash APIs"};
  this.swagger.tags = [];
  this.swagger.paths = {};
  this.swagger.definitions = {};

  this.swagger.paths['/users'] = {};

  apiDocs.swagger.paths['/scheduled_jobs'] = {};

  apiDocs.swagger.paths['/scheduled_jobs/{id}'] = {};

  apiDocs.swagger.paths['/scheduled_jobs'].get = {
    tags: ['jobs'],
    summary: "Get list of scheduled_jobs",
    description: "",
    parameters: [

    ],
   responses: {
     200: {
       description: "OK",
       schema: jsonSchemas.scheduled_job_list_response
     }
   }
  }

  apiDocs.swagger.paths['/users'].post = {
    tags: ['users'],
    summary: "Get list of users",
    description: "",
    parameters: [

    ],
   responses: {
     200: {
       description: "OK",
       schema: jsonSchemas.user_instance
     }
   }
  }

  callback(this.swagger);
}

Repository.prototype = {
    get: get
};

var repository = new Repository();

module.exports = repository;
