const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const { APIError } = require('../error');

const validateString = (value, fieldName = 'Value') => {
  if (typeof value !== 'string') {
    throw new APIError(`${fieldName} must be string type!`, 400);
  }
};

const validateNumber = (value, fieldName = 'Value') => {
  if (typeof value !== 'number') {
    throw new APIError(`${fieldName} must be number type!`, 400);
  }
};

const validateBoolean = (value, fieldName = 'Value') => {
  if (typeof value !== 'boolean') {
    throw new APIError(`${fieldName} must be boolean type!`, 400);
  }
};

const validateArray = (value, fieldName = 'Value') => {
  if (!Array.isArray(value)) {
    throw new APIError(`${fieldName} must be array type!`, 400);
  }
};

const validateObject = (value, fieldName = 'Value') => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new APIError(`${fieldName} must be object type!`, 400);
  }
};

const validateObjectId = (value, fieldName = 'Value') => {
  if (!ObjectId.isValid(value)) {
    throw new APIError(`${fieldName} must be ObjectId type!`, 400);
  }
};

module.exports = {
  validateString,
  validateNumber,
  validateBoolean,
  validateArray,
  validateObject,
  validateObjectId,
};
