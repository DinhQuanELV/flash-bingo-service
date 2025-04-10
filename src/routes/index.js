const siteRouter = require('./site.routes');
const authRouter = require('./auth.routes');
const moduleRouter = require('./module.routes');

const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/module', moduleRouter);
  app.use('/', siteRouter);
};

module.exports = routes;
