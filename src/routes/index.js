const siteRouter = require('./site.routes');

const routes = (app) => {
  app.use('/', siteRouter);
};

module.exports = routes;
