var os = require('os');
var commandLineArgs = process.argv;

function SettingsConfig() {
  this.settings = {};

  initializeSettings(this.settings);
}

function initializeSettings(settings) {
  createEnvironmentSettings(settings);
  loadConfigSettings(settings);
  loadServerSettings(settings);
}

function createEnvironmentSettings(settings) {
  settings.environment = process.env.ENV ? process.env.ENV.toLowerCase() : 'prod';
  settings.hostName = process.env.HOST ? process.env.HOST : '127.0.0.1';
  settings.workerPort =  process.env.PORT ? parseInt(process.env.PORT) : 8080;
}

function loadConfigSettings(settings) {
  var config = loadEnvironmentConfigFile(settings);

  var settingsLength = config.settings.length;

  for(var i = 0; i < settingsLength; i++) {
    var configSetting = config.settings[i];

    if(configSetting.name && configSetting.value) {
      settings[configSetting.name] = configSetting.value;
    }
  }
}

function loadServerSettings(settings) {
  settings.serverName = os.hostname().toLowerCase();
  settings.serverCores = os.cpus().length;
}

function loadEnvironmentConfigFile(settings) {
  var config;

  var configLocation = './settings.config.prod.json';

  switch(settings.environment) {
    case 'dev':
      configLocation = './settings.config.dev.json';
      break;
    case 'test':
      configLocation = './settings.config.test.json';
      break;
  }

  try {
    config = require(configLocation);
  }
  catch(e) {
    throw 'Unable to parse "lib/config/settings/"' + configLocation + ': ' + e;
  }

  if(!config.settings) {
    throw 'Property "settings" is no defined: ' + configLocation;
  }

  return config;
}

var settingsConfig = new SettingsConfig();

module.exports = settingsConfig;
