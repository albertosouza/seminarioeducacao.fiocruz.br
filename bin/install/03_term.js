var async = require('async');

module.exports = function(we, done) {
  we.db.models.vocabulary.find({ limit: 1}).then(function(vocabulary) {
    async.each([
      {
        text: 'Get started',
        vocabularyName: vocabulary.name
      },
      {
        text: 'Features',
        vocabularyName: vocabulary.name
      }
    ], function(term, next) {
      we.db.models.term.findOrCreate({
        where: { text: term.text },
        defaults: term
      })
      .spread(function(t) {
        next();
      }).catch(next);
    }, done);
   }).catch(done);
};