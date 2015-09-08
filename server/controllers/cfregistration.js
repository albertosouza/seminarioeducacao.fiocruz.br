var registrationFIelds  = [
  'registrationId'+
  'userId'+
  'email'+
  'displayName'+
  'fullName'+
  'status'+
  'registrationDate'+
  'cpf'+
  'passaporte'+
  'country'+
  'locationState'+
  'u.city'+
  'organization'+
  'gender'
];

module.exports = {
  /**
   * Export event registration list
   */
  exportRegistration: function exportRegistration(req, res) {
    var we = req.getWe();

    var order = ' order by fullName ASC ';
    // valid and parse orderby
    if (req.query.order) {
      var orderParams = req.query.order.split(' ');
      if (orderParams.length == 2) {
        if ( (orderParams[1] =='ASC') || (orderParams[1] == 'DESC') ) {
          if (registrationFIelds.indexOf(orderParams[0])) {
            order = ' order by '+req.query.order;
          }
        }
      }
    }

    var sql = 'SELECT '+
      'cfregistrations.id as registrationId, '+
      'cfregistrations.userId, '+
      'u.email, '+
      'u.displayName, '+
      'u.fullName, '+
      'cfregistrations.status, '+
      'cfregistrations.createdAt AS registrationDate, '+
      'u.cpf, '+
      'u.passaporte, '+
      'u.country, '+
      'u.locationState, '+
      'u.city, '+
      'terms.text AS organization, '+
      'u.gender AS gender '+
    'FROM cfregistrations '+
    'INNER JOIN users AS u ON u.id=cfregistrations.userId '+
    'LEFT JOIN modelsterms ON modelsterms.modelId=u.id '+
      'AND modelsterms.modelName=\'user\' '+
      'AND modelsterms.field=\'organization\' '+
    'LEFT JOIN terms ON terms.id=modelsterms.termId '+
    'WHERE cfregistrations.eventId='+ res.locals.event.id +
    ' ' + order;

    we.db.defaultConnection.query(sql, {
      type: we.db.defaultConnection.QueryTypes.SELECT
    }).then(function (results) {
        we.csv.stringify(results, {
          header: true,
          quotedString: true,
          columns: {
            fullName: 'fullName',
            displayName: 'displayName',
            registrationId: 'registrationId',
            userId: 'userId',
            email: 'email',
            organization: 'organization',
            status: 'status',
            registrationDate: 'registrationDate',
            cpf: 'cpf',
            passaporte: 'passaporte',
            country: 'país',
            locationState: 'estado',
            city: 'cidade'
          }
        }, function (err, data){
          if (err) return res.serverError(err);
          var fileName = 'registration-export-' +
            res.locals.event.id + '-'+
            new Date().getTime() + '.csv';
          res.setHeader('Content-disposition', 'attachment; filename='+fileName);
          res.set('Content-Type', 'application/octet-stream');
          res.send(data);
        });
    }).catch(res.queryError);
  }
};