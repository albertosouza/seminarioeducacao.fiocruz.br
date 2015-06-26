
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  // set plugin routes
  plugin.setRoutes({
    // homepage | default home page
    'get /': {
      controller : 'main',
      action     : 'index',
      template   : 'home/index',
      layoutName : 'fullwidth'
    },
    'get /conference/:conferenceId([0-9]+)': {
      name          : 'conference_findOne',
      controller    : 'conference',
      action        : 'findOne',
      model         : 'conference',
      layoutName    : 'fullwidth',
      permission    : true
    }
  });

  return plugin;
};