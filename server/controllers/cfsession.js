module.exports = {
  /**
   * Return cfsession subscribers in csv format
   *
   */
  exportSubscribers: function exportSubscribers(req, res) {
    var format = ( (req.user && req.user.language) || req.we.config.date.defaultFormat);

    res.locals.Model.findOne({
      where: { id: req.params.cfsessionId }
    }).then(function (r) {
      if (!r) return res.notFound();
      // add user association
      res.locals.query.include = [ { model: req.we.db.models.user, as: 'user'} ];
      // sort by fullName by default
      if (!req.query.notSortByFullName) {
        res.locals.query.order = [[
          { model: req.we.db.models.user, as: 'user' },
          'fullName', 'ASC'
        ]];
      }

      delete res.locals.query.limit;

      res.locals.record = r;
      r.getSubscribers(res.locals.query).then(function (s) {
        res.locals.record.subscribers = s;

        var subscriptions = s.map(function (i) {
          return {
            id: i.id,
            userId: i.user.id,
            displayName: i.user.displayName,
            fullName: i.user.fullName,
            email: i.user.email,
            createdAt: req.we.utils.moment(i.createdAt).format(format)
          };
        });

        req.we.csv.stringify(subscriptions, {
          header: true,
          quotedString: true,
          columns: {
            id: 'id',
            userId: 'userId',
            displayName: 'displayName',
            fullName: 'fullName',
            email: 'email',
            createdAt: 'createdAt'
          }
        }, function (err, data) {
          if (err) return res.serverError(err);
          var fileName = 'subscriptions-export-' +
            res.locals.conference.id + '-'+
            req.params.cfsessionId + '-'+
            new Date().getTime() + '.csv';

          res.setHeader('Content-disposition', 'attachment; filename='+fileName);
          res.set('Content-Type', 'application/octet-stream');
          res.send(data);
        });

      }).catch(res.queryError);
    }).catch(res.queryError);
  }
};