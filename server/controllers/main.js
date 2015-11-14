/**
 * Main project controller
 */
var http = require('http');
var request = require('request');

module.exports = {
  index: function index(req, res) {
    res.redirect('/event');
  },
  redirectToSendWork: function redirectToSendWork(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/event/'+req.params.eventId+'/user/'+req.user.id+'/cfwork');
    } else {
      res.redirect('/login?redirectTo=' + req.url);
    }
  },
  redirectToCertifications: function redirectToCertifications(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/user/'+req.user.id+'/certification');
    } else {
      res.redirect('/login?redirectTo=' + req.url);
    }
  },

  /**
   * Proxy request from unasus oai https server to http
   */
  oaiUnasusPMHProxy: function oaiUnasusPMHProxy(req, res, next) {
    var url = 'https://ares.unasus.gov.br';
    url += req.url.replace('/oai-unasus', '');

    request(url, function (error, response, body) {
      if (error) {
        console.error('Error on get data from unasus server',error);
      }

      var contentType = response.headers['content-type'];
      res.writeHead(response.statusCode, {'Content-Type': contentType});
      res.end(body);
    });
  }
};