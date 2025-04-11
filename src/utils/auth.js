const validator = require('validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { APIError } = require('../error');

const validateRegister = async (username, email, password) => {
  // check empty
  if (!username || !email || !password) {
    throw new APIError('Please fill all the fields!', 400);
  }

  // check email type
  if (!validator.isEmail(email)) {
    throw new APIError('Email is not valid!', 400);
  }

  // check password length
  if (password.length < 8) {
    throw new APIError('Password must have at least 8 characters', 400);
  }

  // check existing user
  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (existingUser) {
    // check existing username
    if (username === existingUser.username) {
      throw new APIError('Username already exists!', 400);
    }

    // check existing email
    if (email === existingUser.email) {
      throw new APIError('Email already exists!', 400);
    }
  }
};

const validateLogin = async (username, password) => {
  // check user fill username or password
  if (!username || !password) {
    throw new APIError('Please fill all the fields!', 400);
  }

  // find user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new APIError('Invalid username!', 404);
  }

  // check password
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new APIError('Invalid password!', 401);
  }

  return user;
};

module.exports = {
  validateRegister,
  validateLogin,
};
