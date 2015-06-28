var async= require('async');

module.exports = function(we, done) {
  we.db.models.user.find({ limit: 1}).then(function(user) {

    async.series([
      function createCategories(cb) {
        we.db.models.vocabulary.findOrCreate({
          where: {
            name: 'Category'
          },
          defaults: {
            creatorId : user.id,
            name: 'Category'
          }
        }).spread(function (v){
          we.log.info('Vocabulary Category created with id:', v.id);
          cb();
        }).catch(cb);
      },
      function createOrganization(cb) {
        we.db.models.vocabulary.findOrCreate({
          where: {
            name: 'Organization'
          },
          defaults: {
            creatorId : user.id,
            name: 'Organization'
          }
        }).spread(function (v){
          we.log.info('Vocabulary Organization created with id:', v.id);
          cb();
        }).catch(cb);
      }
    ], done);

  }).catch(done);
};