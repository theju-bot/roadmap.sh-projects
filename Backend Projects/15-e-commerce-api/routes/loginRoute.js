const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const { renderLoginPage, renderRegisterPage } = require('../controllers/frontEndController');

router.route('/')
    .get(renderLoginPage)
    .post(loginUser);

router.route('/register')
    .get(renderRegisterPage);

module.exports = router;