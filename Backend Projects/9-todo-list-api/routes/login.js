const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/loginController');

router.post('/', verifyUser);

module.exports = router;
