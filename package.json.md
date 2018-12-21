{
  "name": "bookapi",
  "version": "1.0.0",
  "description": "videoaula pluralsight",
  "main": "index.js",
  "scripts": {
    "test": "test",
    "start": "node app.js"
  },
  "repository": {
    "type": "git",
    "url": "restfullwebservices"
  },
  "keywords": [
    "restfullwebservices"
  ],
  "author": "Jonathan Mills / Bruno R Demboscki",
  "license": "MIT",
  "dependencies": {
    "body-parser": "^1.18.3", //parse do json automaticamente, injetando ".body" na model.
    "express": "^4.16.4", // servidor web
    "gulp": "^3.9.1", // atualização viva sem precisar reiniciar
    "gulp-mocha": "^6.0.0", // utiliza unit test do tipo mocha.
    "gulp-nodemon": "^2.2.1",
    "mongoose": "^5.3.8", // utiliza mongo para persistência de dados.
    "should": "^13.2.3", // complemento de teste unitário indica o que o teste deveria fazer.
    "sinon": "^7.1.1" //dependencia do gulp-mocha
  },
  "devDependencies": {
    "gulp-env": "^0.4.0",
    "supertest": "^3.3.0"
  }
}