var async = require('async');


module.exports = function(we, done) {
  var register = require(
    we.projectPath +'/node_modules/we-plugin-location/bin/registerAllLocations.js'
  );

  register.saveLocations(we, done);
};