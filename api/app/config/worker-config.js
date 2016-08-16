var http = require('http');
var express = require('express');
var application = express();
var bodyParser = require('body-parser');
var routeConfig = require('./route-config');
var settingsConfig = require('./settings/settings-config');

function configureWorker(application) {
  configureApplication(application);
  configureRoutes(application);

  startServer(application);
}

function configureApplication(application) {
  application.use(bodyParser.json());

  application.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.type('application/json');
    next();
  });
}

function configureRoutes(application) {
  routeConfig.registerRoutes(application);
}

function startServer(application) {
  application.listen(settingsConfig.settings.workerPort);
  console.log('Magic happens on port ' + settingsConfig.settings.workerPort);

  // Catch SIGINT in docker
  // https://github.com/nodejs/node/issues/4182
  process.on('SIGINT', function() {
      process.exit();
  });
}

configureWorker(application);
