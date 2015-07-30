
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
    //redirect to conference 1
    'get /': {
      controller : 'main',
      action     : 'index',
      template   : 'home/index',
      layoutName : 'fullwidth'
    },
    //redirect to conference 1
    'get /conference': {
      controller : 'main',
      action     : 'index',
      template   : 'home/index',
      layoutName : 'fullwidth'
    },
    'get /conference/1/enviar-trabalho':  {
      controller : 'main',
      action     : 'redirectToSendWork',
      responseType: 'json'
    }
  });

  return plugin;
};