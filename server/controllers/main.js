/**
 * Main project controller
 */

module.exports = {
  /**
   * Index page route /
   */
  index: function(req, res) {
    res.redirect('/conference/1');
  },

  redirectToSendWork: function redirectToSendWork(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/conference/1/user/'+req.user.id+'/cfwork');
    } else {
      res.redirect('/login?redirectTo=' + req.url);
    }
  }
};