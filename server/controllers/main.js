/**
 * Main project controller
 */

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
  }
};