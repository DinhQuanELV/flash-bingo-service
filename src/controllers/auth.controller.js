const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/User');
const { validateRegister, validateLogin } = require('../utils/auth');

require('dotenv').config();
const cookiesSecure = process.env.COOKIES_SECURE === 'true';

const authController = {
  // [POST] /auth/register
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      await validateRegister(username, email, password);

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // save user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      return res.status(201).json({ message: 'Register successfully!' });
    } catch (error) {
      next(error);
    }
  },

  // [GET] /auth/login
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await validateLogin(username, password);
      if (user) {
        // generate token
        const accessToken = jwt.sign(
          { id: user._id },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: '30d' },
        );

        // store token in cookies
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: cookiesSecure,
          sameSite: process.env.COOKIES_SAME_SITE,
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30d * 24h * 60m * 60s * 1000 (ms)
        });

        const { _id, password, ...others } = user._doc;
        res.cookie('userId', _id, {
          httpOnly: true,
          secure: cookiesSecure,
          sameSite: process.env.COOKIES_SAME_SITE,
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30d * 24h * 60m * 60s * 1000 (ms)
        });

        return res.status(200).json({ ...others });
      }
    } catch (error) {
      next(error);
    }
  },

  // [POST] /auth/logout
  logout: async (req, res, next) => {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: cookiesSecure,
        sameSite: process.env.COOKIES_SAME_SITE,
      });
      res.clearCookie('userId', {
        httpOnly: true,
        secure: cookiesSecure,
        sameSite: process.env.COOKIES_SAME_SITE,
      });
      return res.status(200).json({ message: 'Log out successfully!' });
    } catch (error) {
      next(error);
    }
  },

  // [POST] /auth/forgot-password
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email }).lean();
      if (!user) {
        return res.status(404).json({ message: 'Email not found!' });
      }

      // generate reset token
      const resetToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_RESET_KEY,
        {
          expiresIn: '15m',
        },
      );

      // send mail
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

      const info = await transporter.sendMail({
        from: `"FLASH VN" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset your FLASH account password',
        html: `<h3>Reset your FLASH account password</h3>
        <p>Click <a href="${resetLink}">here</a> to reset your password</p>
        <p>If not you, you can ignore this email!</p>`,
      });

      return res.status(200).json(info);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /auth/reset-password
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.query;
      const { newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ message: 'Invalid request!' });
      }

      // verify token
      let decode;
      try {
        decode = jwt.verify(token, process.env.JWT_RESET_KEY);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid token!' });
      }

      // find user
      const user = await User.findById(decode.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Reset password successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
