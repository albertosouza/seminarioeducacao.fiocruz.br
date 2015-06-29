#Sistema do evento Seminário “Educação, Saúde e Sociedade do Futuro”

#How to install

Clone the project
```sh
git clone git@github.com:albertosouza/seminarioeducacao.fiocruz.br.git
cd site
```

Install **npm** and **bower** dependencies
```sh
npm run deps

```
#Commands

#####Run project in development environment:
```sh
npm run dev
```
#####Build production client app:
```sh
npm run build
```

#####Run project in production environment:
```sh
npm run prod
```


# Test

```sh
npm test
```

```sh
NODE_ENV=test LOG_LV=verbose ./node_modules/.bin/mocha test/bootstrap.js test/**/*.test.js -b -g 'text'
```

#Copyright and license

Copyright 2013-2015 Alberto Souza <alberto.souza.dev@gmail.com> and contributors, under the MIT license.