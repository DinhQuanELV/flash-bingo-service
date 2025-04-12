const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

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
      const modules = await Module.find().lean();
      if (modules.length === 0) {
        return res.status(404).json({ message: 'No modules found!' });
      }

      return res.status(200).json(modules);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /module/show/:moduleId
  show: async (req, res, next) => {
    try {
      const { moduleId } = req.params;

      if (!ObjectId.isValid(moduleId)) {
        return res.status(400).json({ message: 'Invalid moduleId!' });
      }

      const module = await Module.findById(moduleId).lean();
      if (!module) {
        return res.status(404).json({ message: 'Module not found!' });
      }

      return res.status(200).json(module);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /module/search
  search: async (req, res, next) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        return res.status(200).json({
          modules: [],
          message: 'No modules found!',
        });
      }

      const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexPattern = new RegExp(safeQuery, 'i');

      const modules = await Module.find({
        title: { $regex: regexPattern },
      }).lean();
      if (modules.length === 0) {
        return res.status(200).json({
          modules: [],
          message: 'No modules found!',
        });
      }

      return res.status(200).json(modules);
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
