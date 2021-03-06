/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const anonymous = require('../controllers/anonymous');

const loggedAuth = async (req, res, next) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const token = req.cookies.auth;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.cachedUser = user;
    next();
  } catch (error) {
    res.status(401).render('404', { error: { message: 'You\'re not authenticated' } });
  }
};

const anonymousAuth = async (req, res, next) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const token = req.cookies.auth;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    res.redirect('/');
  } catch (error) {
    req.cachedUser = anonymous();
    next();
  }
};

const viewAuth = async (req, res, next) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');

    const token = req.cookies.auth;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.cachedUser = user;
    next();
  } catch (error) {
    req.cachedUser = anonymous();
    next();
  }
};

module.exports = {
  loggedAuth,
  anonymousAuth,
  viewAuth,
};
