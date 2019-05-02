const User = require('../models/user');

// Sign up page
const getSignupPage = async (req, res) => {
  res.render('user/signup');
};

// Sign up
const postSignup = async (req, res) => {

  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie('auth', token);

    res.status(201).redirect('/');
  } catch (error) {
    res.status(400).redirect('/users/signup');
  }
};

// Sign up page
const getSigninPage = async (req, res) => {
  res.render('user/signin');
};

// Sign in
const postSignin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();
    res.cookie('auth', token);

    res.status(200).redirect('/');
  } catch (error) {
    res.status(400).send();
  }
};

// Sign out
const postSignout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens
      .filter(token => token.token !== req.token);

    res.cookie.set('auth', { maxAge: Date.now() });
    await req.user.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  getSignupPage,
  postSignup,
  postSignin,
  postSignout,
  getSigninPage,
};
