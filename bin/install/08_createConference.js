var async = require('async');
module.exports = function(we, done) {
  we.db.models.user.find({ limit: 1}).then(function(user) {
    we.db.models.conference.create({
      abbreviation: 'SESSF',
      title: 'Seminário Edicação, saúde e Sociedade do Futuro',
      about: 'O Seminário “Educação, Saúde e Sociedade do Futuro”, que será realizado de 25 a 27 de agosto de 2015, terá por finalidade promover a discussão sobre perspectivas e novas visões sobre a educação na sociedade contemporânea, colocando em foco diretrizes e projetos educacionais inovadores.',
      registrationManagerName: 'Coordenação',
      registrationManagerEmail: 'contato@albertosouza.net',
      location: 'Fundação Oswaldo Cruz, Rio de Janeiro, Brasil',

      vacation: 200,

      callForPapersStartDate: null,
      callForPapersEndDate: null,
      registrationStartDate: '2015-06-26 09:00:00',
      registrationEndDate: '2015-08-27 16:00:00',
      eventStartDate: '2015-08-25 09:00:00',
      eventEndDate: '2015-08-27 17:00:00'
    }).then(function (r) {
      we.log.info('Conference created: ', r.id, r.title);

      we.db.models.cfmenu.findOne({
        where: { conferenceId: r.id, name: 'main' }
      }).then(function (menu) {
        console.log('menu', menu)
        we.db.models.cflink.bulkCreate([
          { href: '/conference/1#home', text: 'Início', weight: 0, conferenceId: r.id, cfmenuId: menu.id  },
          { href: '/conference/1#schedule', text: 'Programação', weight: 1,conferenceId: r.id, cfmenuId: menu.id },
          { href: '/conference/1#speakers', text: 'Palestrantes', weight: 2,conferenceId: r.id, cfmenuId: menu.id },
          { href: '/conference/1#ourLocation', text: 'Localização', weight: 3,conferenceId: r.id, cfmenuId: menu.id },
          { href: '/conference/1/news', text: 'Notícias', weight: 4,conferenceId: r.id, cfmenuId: menu.id },
        ]).then(function() {
          done();
        }).catch(done);
      });
    });
  }).catch(done);
};