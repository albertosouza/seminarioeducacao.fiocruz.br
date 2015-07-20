
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
    // homepage | default home page
    'get /': {
      controller : 'main',
      action     : 'index',
      template   : 'home/index',
      layoutName : 'fullwidth'
    }
  });

  return plugin;
};