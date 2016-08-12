// server.js

// BASE SETUP
// =============================================================================

var express    = require('express');        // call express
var app        = express();                 // define the app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set the port

// ROUTES
// =============================================================================

var endpRoot = require('./endpoints/root');
app.use('/api', endpRoot);

var endpItem = require('./endpoints/item');
app.use('/api/item', endpItem);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// Catch SIGINT in docker
// https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {
    process.exit();
});