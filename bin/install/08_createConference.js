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

      vacanciess: 200,

      callForPapersStartDate: null,
      callForPapersEndDate: null,
      registrationStartDate: '2015-06-26 09:00:00',
      registrationEndDate: '2015-08-27 16:00:00',
      eventStartDate: '2015-08-25 09:00:00',
      eventEndDate: '2015-08-27 17:00:00'
    }).then(function (r) {
      we.log.info('Conference created: ', r.id, r.title);
      async.series([
        function createMenuLinks(done) {
          we.db.models.cfmenu.findOne({
            where: { conferenceId: r.id, name: 'main' }
          }).then(function (menu) {
            we.db.models.cflink.bulkCreate([
              { href: '/conference/1', text: 'Início', weight: 0, conferenceId: r.id, cfmenuId: menu.id  },
              { href: '/conference/1#schedule', text: 'Programação', weight: 1,conferenceId: r.id, cfmenuId: menu.id },
              { href: '/conference/1#speakers', text: 'Palestrantes', weight: 2,conferenceId: r.id, cfmenuId: menu.id },
              { href: '/conference/1#ourLocation', text: 'Localização', weight: 3,conferenceId: r.id, cfmenuId: menu.id },
              { href: '/conference/1/cfnews', text: 'Notícias', weight: 4,conferenceId: r.id, cfmenuId: menu.id },
            ]).then(function() {
              done();
            }).catch(done);
          });
        },
        function createSocialMenuLinks(done) {
          we.db.models.cfmenu.findOne({
            where: { conferenceId: r.id, name: 'social' }
          }).then(function (menu) {
            we.db.models.cflink.bulkCreate([
              { href: '/conference/1', text: '<i class="fa fa-youtube-play"></i>', weight: 0, conferenceId: r.id, cfmenuId: menu.id, class: 'btn btn-empty-inverse btn-lg' },
              { href: '/conference/1', text: '<i class="fa fa fa-twitter"></i>', weight: 1,conferenceId: r.id, cfmenuId: menu.id, class: 'btn btn-empty-inverse btn-lg' },
              { href: '/conference/1', text: '<i class="fa fa-facebook"></i>', weight: 2,conferenceId: r.id, cfmenuId: menu.id, class: 'btn btn-empty-inverse btn-lg' }
            ]).then(function() {
              done();
            }).catch(done);
          });
        },
        function createKeynotes(done) {
          we.db.models.cfspeaker.bulkCreate([
            { name: 'Renato Janine', weight: 5, conferenceId: r.id, about: 'Ministro da Educação. Professor titular de Ética e Filosofia Política na Universidade de São Paulo, na qual se doutorou após defender mestrado na Sorbonne. Tem se dedicado à análise de temas como o caráter teatral da representação política, a ideia de revolução, a democracia, a república, a cultura política brasileira. Atualmente é professor-titular da cadeira de Ética e Filosofia Política da Faculdade de Filosofia, Letras e Ciências Humanas da Universidade de São Paulo.',
              highlighted: true  },
            { name: 'Heider Aurélio Pinto', weight: 5, conferenceId: r.id, about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
              highlighted: true },
            { name: 'Manuel Palacios', weight: 5, conferenceId: r.id, about: 'Secretário de educação básica do Ministério da Educação (MEC).',
              highlighted: true },
            { name: 'Mario Rovere', weight: 5, conferenceId: r.id, about: 'Professor da Universidad de Buenos Aires, Universidad Nacional de Rosario, Faculdade Latinoamericana de Ciencias Sociais (FLACSO).  Pesquisador da Universidad Nacional de La Matanza, Asociación Latinoamricana de Medicina Social ALAMES.',
              highlighted: true },
            { name: 'Naomar Almeida-Filho', weight: 5, conferenceId: r.id, about: 'Professor Titular de Epidemiologia no Instituto de Saúde Coletiva da UFBA. Reitor da Universidade Federal do Sul da Bahia.',
              highlighted: true },
            { name: 'Naomar Almeida-Filho', weight: 5, conferenceId: r.id, about: 'Professor de Novas Tecnologias na USP. Pesquisador de Projetos Educacionais Inovadores com metodologias ativas nas modalidades presencial e a distância.',
              highlighted: true },
            { name: 'Chao Lung Wen', weight: 5, conferenceId: r.id, about: 'Coordenador do Núcleo de Telemedicina e Telessaúde do Hospital das Clínicas da FMUSP. Coordenador do Projeto Homem Virtual e Mídias com impressão 3D.',
              highlighted: true },
            { name: 'Roberto Lent', weight: 5, conferenceId: r.id, about: 'Professor titular da Universidade Federal do Rio de Janeiro, diretor do Instituto de Ciências Biomédicas. É membro titular da Academia Brasileira de Ciências, membro do Conselho Técnico-Científico da CAPES - Ensino Básico, e presidente do Conselho Deliberativo do Instituto Ciência Hoje.',
              highlighted: true },
            { name: 'Isaac Roitman', weight: 5, conferenceId: r.id, about: 'Professor emérito da Universidade de Brasília, coordenador do Núcleo de Estudos do Futuro (n.Futuros/CEAM/UnB), presidente do Comitê Editorial da Revista Darcy/UnB e membro tiular de Academia Brasileira de Ciências.',
              highlighted: true  },
            { name: 'Kenneth Rochel de Camargo Jr', weight: 5, conferenceId: r.id, about: 'Professor adjunto do Instituto de Medicina Social da Universidade do Estado do Rio de Janeiro (IMS/UERJ), editor do American Journal of Public Health e editor da revista Physis. Membro da Comissão de Ciências Sociais e Humanas em Saúde da Abrasco.',
              highlighted: true },
            { name: 'Pierre Levy', weight: 4, conferenceId: r.id, about: 'Professor no Departamento de Hipermídia da Universidade de Paris-VIII. Dedicou sua vida profissional ao entendimento das implicações culturais e cognitivas das tecnologias digitais, com o objetivo de promover seus melhores usos sociais e estudar o fenômeno da inteligência coletiva. Ele é autor de vários livros sobre o assunto que foram traduzidos para mais de 12 línguas e estudados em diferentes universidades em todo o mundo. Atualmente, leciona no departamento de comunicação da Universidade de Ottawa (Canada), onde ele conduz pesquisas sobre Inteligência Coletiva.',
              highlighted: true },
          ]).then(function() {
            done();
          }).catch(done);
        },

        function createConferenceWidgets(done) {
          we.db.models.widget.bulkCreate([
            {
              layout: 'conferenceHome',
              regionName: 'afterContent',
              context: 'conference-'+r.id,
              theme: 'we-theme-conference-seminarioeducacao.fiocruz.br',
              weight: 8,
              type: 'we-cf-topics'
            },
            {
              title: 'Programação',
              layout: 'conferenceHome',
              regionName: 'afterContent',
              context: 'conference-'+r.id,
              theme: 'we-theme-conference-seminarioeducacao.fiocruz.br',
              weight: 9,
              type: 'we-cf-schedule'
            },
            {
              title: 'Conferencistas',
              layout: 'conferenceHome',
              regionName: 'afterContent',
              context: 'conference-'+r.id,
              theme: 'we-theme-conference-seminarioeducacao.fiocruz.br',
              weight: 10,
              type: 'we-cf-speakers'
            },
            {
              title: 'Apoio',
              layout: 'conferenceHome',
              regionName: 'afterContent',
              context: 'conference-'+r.id,
              theme: 'we-theme-conference-seminarioeducacao.fiocruz.br',
              weight: 11,
              type: 'we-cf-partners'
            },
            {
              title: '',
              layout: 'conferenceHome',
              regionName: 'afterContent',
              context: 'conference-'+r.id,
              theme: 'we-theme-conference-seminarioeducacao.fiocruz.br',
              weight: 50,
              type: 'html',
              configuration: {
                html: '<div id=\"ourLocation\" class=\"map\">\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div id=\"map\" class=\"col-lg-12 map-container\">\n<iframe width=\"100%\" height=\"740px\" frameborder=\"0\" allowfullscreen=\"\" style=\"border:0\" src=\"https:\/\/www.google.com\/maps\/embed?pb=!1m18!1m12!1m3!1d3675.933564729386!2d-43.24567453439329!3d-22.878912435058442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0xf2a8c8b086320cf6!2sFunda%C3%A7%C3%A3o+Oswaldo+Cruz!5e0!3m2!1spt-BR!2sbr!4v1437165452503\"><\/iframe>\n      <\/div>\n    <\/div>\n  <\/div>\n  <div class=\"location wow flipInY animated\" style=\"visibility: visible; animation-name: none;\" data-wow-animation-name=\"none\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <div class=\"popover bottom\">\n            <div class=\"arrow\"><\/div>\n            <h2 class=\"popover-title\">Location<\/h2>\n            <div class=\"popover-content\">\n              <div class=\"row\">\n                <div class=\"col-sm-6\">\n                  <div id=\"streetView\" class=\"street-view\"><iframe width=\"100%\" height=\"250\" frameborder=\"0\" allowfullscreen=\"\" style=\"border:0\" src=\"https:\/\/www.google.com\/maps\/embed?pb=!1m0!3m2!1spt-BR!2sbr!4v1435288764083!6m8!1m7!1sJea9_ryyI4zxiv1heIn1SA!2m2!1d-22.875695!2d-43.242951!3f242.60279501696186!4f4.606083480259386!5f1.3887948905580452\"><\/iframe><\/div>\n                <\/div>\n                <div class=\"col-sm-6\">\n                  <br><br>\n                  <ul class=\"list-unstyled\">\n                    <li><i class=\"fa fa-map-marker info-color\"><\/i> Fundação Oswaldo Cruz, Rio de Janeiro, Brasil<\/li>\n                    <li><i class=\"fa fa-envelope info-color\"><\/i> contato@albertosouza.net<\/li>\n                  <\/ul>\n                <\/div>\n              <\/div>\n            <\/div>\n          <\/div>\n        <\/div>\n      <\/div>\n    <\/div>\n  <\/div>\n<\/div>'
              }
            }
          ]).then(function() {
            done();
          }).catch(done);
        },

        function createCfTopics(done) {
          we.db.models.cftopic.bulkCreate([
            { title: 'Educação, Tecnologia e Sociedade: qual futuro queremos?', weight: 5, conferenceId: r.id },
            { title: 'Educação e Trabalho para o SUS: desafios de um projeto de país', weight: 6, conferenceId: r.id },
            { title: 'Formação para a Pesquisa e Inovação', weight: 7, conferenceId: r.id }
          ]).then(function() {
            done();
          }).catch(done);
        }
      ], done);
    });
  }).catch(done);
};