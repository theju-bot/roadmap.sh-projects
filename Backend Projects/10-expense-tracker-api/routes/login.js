const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

router.get('/', loginUser);

module.exports = router;
