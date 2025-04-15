const siteRouter = require('./site.routes');
const authRouter = require('./auth.routes');
const moduleRouter = require('./module.routes');
const questionRouter = require('./question.routes');
const bingoRouter = require('./bingo.routes');

const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/module', moduleRouter);
  app.use('/question', questionRouter);
  app.use('/bingo', bingoRouter);
  app.use('/', siteRouter);
};

module.exports = routes;
