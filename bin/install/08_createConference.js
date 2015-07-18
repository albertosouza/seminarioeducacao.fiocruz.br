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
        function(done) {
          we.db.models.cfmenu.findOne({
            where: { conferenceId: r.id, name: 'main' }
          }).then(function (menu) {
            we.db.models.cflink.bulkCreate([
              { href: '/conference/1', text: 'Início', weight: 0, conferenceId: r.id, cfmenuId: menu.id  },
              { href: '/conference/1#schedule', text: 'Programação', weight: 1,conferenceId: r.id, cfmenuId: menu.id },
              { href: '/conference/1#speakers', text: 'Palestrantes', weight: 2,conferenceId: r.id, cfmenuId: menu.id },
              { href: '/conference/1#ourLocation', text: 'Localização', weight: 3,conferenceId: r.id, cfmenuId: menu.id },
              { href: '/conference/1/news', text: 'Notícias', weight: 4,conferenceId: r.id, cfmenuId: menu.id },
            ]).then(function() {
              done();
            }).catch(done);
          });
        },

        function(done) {
          we.db.models.cfkeynote.bulkCreate([
            { name: 'Renato Janine', weight: 5, conferenceId: r.id, about: 'Ministro da Educação. Professor titular de Ética e Filosofia Política na Universidade de São Paulo, na qual se doutorou após defender mestrado na Sorbonne. Tem se dedicado à análise de temas como o caráter teatral da representação política, a ideia de revolução, a democracia, a república, a cultura política brasileira. Atualmente é professor-titular da cadeira de Ética e Filosofia Política da Faculdade de Filosofia, Letras e Ciências Humanas da Universidade de São Paulo.'  },
            { name: 'Heider Aurélio Pinto', weight: 5, conferenceId: r.id, about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'  },
            { name: 'Manuel Palacios', weight: 5, conferenceId: r.id, about: 'Secretário de educação básica do Ministério da Educação (MEC).'  },
            { name: 'Mario Rovere', weight: 5, conferenceId: r.id, about: 'Professor da Universidad de Buenos Aires, Universidad Nacional de Rosario, Faculdade Latinoamericana de Ciencias Sociais (FLACSO).  Pesquisador da Universidad Nacional de La Matanza, Asociación Latinoamricana de Medicina Social ALAMES.'  },
            { name: 'Naomar Almeida-Filho', weight: 5, conferenceId: r.id, about: 'Professor Titular de Epidemiologia no Instituto de Saúde Coletiva da UFBA. Reitor da Universidade Federal do Sul da Bahia.'  },
            { name: 'Naomar Almeida-Filho', weight: 5, conferenceId: r.id, about: 'Professor de Novas Tecnologias na USP. Pesquisador de Projetos Educacionais Inovadores com metodologias ativas nas modalidades presencial e a distância.'  },
            { name: 'Chao Lung Wen', weight: 5, conferenceId: r.id, about: 'Coordenador do Núcleo de Telemedicina e Telessaúde do Hospital das Clínicas da FMUSP. Coordenador do Projeto Homem Virtual e Mídias com impressão 3D.'  },
            { name: 'Roberto Lent', weight: 5, conferenceId: r.id, about: 'Professor titular da Universidade Federal do Rio de Janeiro, diretor do Instituto de Ciências Biomédicas. É membro titular da Academia Brasileira de Ciências, membro do Conselho Técnico-Científico da CAPES - Ensino Básico, e presidente do Conselho Deliberativo do Instituto Ciência Hoje.'  },
            { name: 'Isaac Roitman', weight: 5, conferenceId: r.id, about: 'Professor emérito da Universidade de Brasília, coordenador do Núcleo de Estudos do Futuro (n.Futuros/CEAM/UnB), presidente do Comitê Editorial da Revista Darcy/UnB e membro tiular de Academia Brasileira de Ciências.'  },
            { name: 'Kenneth Rochel de Camargo Jr', weight: 5, conferenceId: r.id, about: 'Professor adjunto do Instituto de Medicina Social da Universidade do Estado do Rio de Janeiro (IMS/UERJ), editor do American Journal of Public Health e editor da revista Physis. Membro da Comissão de Ciências Sociais e Humanas em Saúde da Abrasco.'  },
            { name: 'Pierre Levy', weight: 4, conferenceId: r.id, about: 'Professor no Departamento de Hipermídia da Universidade de Paris-VIII. Dedicou sua vida profissional ao entendimento das implicações culturais e cognitivas das tecnologias digitais, com o objetivo de promover seus melhores usos sociais e estudar o fenômeno da inteligência coletiva. Ele é autor de vários livros sobre o assunto que foram traduzidos para mais de 12 línguas e estudados em diferentes universidades em todo o mundo. Atualmente, leciona no departamento de comunicação da Universidade de Ottawa (Canada), onde ele conduz pesquisas sobre Inteligência Coletiva.'  },
          ]).then(function() {
            done();
          }).catch(done);
        }
      ], done);
    });
  }).catch(done);
};