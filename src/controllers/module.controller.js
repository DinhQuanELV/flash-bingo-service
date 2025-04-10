const Module = require('../models/Module');

const moduleController = {
  // [POST] /module/create
  create: async (req, res, next) => {
    try {
      const { title, keywords } = req.body;
      // check empty content
      if (!title || !keywords) {
        return res.status(400).json({ message: 'Please type content!' });
      }

      //   check exists module
      const existsModule = await Module.findOne({ title });
      if (existsModule) {
        return res.status(409).json({ message: 'Module already exists!' });
      }

      //   create new module
      const module = new Module({
        title,
        keywords,
      });
      await module.save();

      return res.status(201).json({
        message: 'Create module successfully!',
        module,
      });
    } catch (error) {
      next(error);
    }
  },

  // [GET] /module/show/all
  showAll: async (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },

  // [GET] /module/show/:moduleId
  show: async (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },

  // [POST] /module/search
  search: async (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },

  // [PUT] /module/update/:moduleId
  update: async (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /module/delete/:moduleId
  delete: async (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },
};

module.exports = moduleController;
