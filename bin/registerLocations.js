var async = require('async');
var we = require('we-core');


we.bootstrap(function(err, we) {
  if (err) throw err;

  var register = require(
    we.projectPath +'/node_modules/we-plugin-location/bin/registerAllLocations.js'
  );

  register.saveLocations(we, done);
});
