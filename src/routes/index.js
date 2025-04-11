const siteRouter = require('./site.routes');
const authRouter = require('./auth.routes');

const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/', siteRouter);
};

module.exports = routes;
