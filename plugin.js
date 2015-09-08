
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  // set plugin configs
  plugin.setConfigs({
    forms: {
      //'login': __dirname + '/server/forms/login.json',
      'register': __dirname + '/server/forms/register.json'
    }
  });

  // set plugin routes
  plugin.setRoutes({
    'get /event/1/enviar-trabalho':  {
      controller : 'main',
      action     : 'redirectToSendWork',
      responseType: 'json'
    }
  });

  plugin.hooks.on('we:models:before:instance', function (we, done) {
    we.db.modelsConfigs.user.definition.username.unique = false;
    we.db.modelsConfigs.user.definition.username.allowNull = true;
    delete we.db.modelsConfigs.user.definition.username.validate;

    done();
  });

  return plugin;
};