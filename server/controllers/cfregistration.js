
module.exports = {
  /**
   * Export conference registration list
   */
  exportRegistration: function exportRegistration(req, res) {
    var we = req.getWe();

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
      'u.city '+
    'FROM cfregistrations '+
    'INNER JOIN users AS u ON u.id=cfregistrations.userId '+
    'WHERE cfregistrations.conferenceId='+ res.locals.conference.id;

    we.db.defaultConnection.query(sql, {
      type: we.db.defaultConnection.QueryTypes.SELECT
    }).then(function (results) {
        we.csv.stringify(results, {
          header: true,
          quotedString: true,
          columns: {
            registrationId: 'registrationId',
            userId: 'userId',
            email: 'email',
            displayName: 'displayName',
            fullName: 'fullName',
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
            res.locals.conference.id + '-'+
            new Date().getTime() + '.csv';
          res.setHeader('Content-disposition', 'attachment; filename='+fileName);
          res.set('Content-Type', 'application/octet-stream');
          res.send(data);
        });
    }).catch(res.queryError);
  }
};