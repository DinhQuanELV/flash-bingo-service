const Module = require('../models/Module');
const Question = require('../models/Question');
const { validateString, validateArray, validateObjectId } = require('../utils/validateType');

const moduleController = {
  // [POST] /module/create
  create: async (req, res, next) => {
    try {
      const { title, keywords } = req.body;

      // check empty content
      if (!title || !keywords) {
        return res.status(400).json({ message: 'Please type content!' });
      }

      // check type value
      validateString(title, 'title');
      validateArray(keywords, 'keywords');

      // check exists module
      const existsModule = await Module.findOne({ title }).lean();
      if (existsModule) {
        return res.status(409).json({ message: 'Module already exists!' });
      }

      // create new module
      const module = new Module({
        title,
        keywords,
      });
      await module.save();

      return res.status(201).json(module);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /module/show/all
  showAll: async (req, res, next) => {
    try {
      const modules = await Module.find().lean();
      if (modules.length === 0) {
        return res.status(200).json({
          message: 'Does not have any module yet!',
          modules: [],
        });
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

      validateObjectId(moduleId, 'moduleId');

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
      const { moduleId } = req.params;
      const { title, keywords } = req.body;

      if (!title || !keywords) {
        return res.status(400).json({ message: 'Please type content!' });
      }

      validateObjectId(moduleId, 'moduleId');
      validateString(title, 'title');
      validateArray(keywords, 'keywords');

      const module = await Module.findByIdAndUpdate(moduleId, { title, keywords }, { new: true }).lean();
      if (!module) {
        return res.status(404).json({ message: 'Module not found!' });
      }

      return res.status(200).json(module);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /module/delete/:moduleId
  delete: async (req, res, next) => {
    try {
      const { moduleId } = req.params;

      validateObjectId(moduleId, 'moduleId');

      const module = await Module.findById(moduleId).lean();
      if (!module) {
        return res.status(404).json({ message: 'Module not found!' });
      }

      await Question.deleteMany({ moduleId }).lean();
      await Module.findByIdAndDelete(moduleId).lean();

      return res.status(200).json({ message: 'Delete module successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = moduleController;
