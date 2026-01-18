const express = require("express");
const router = express.Router();
const { userLogin } = require('../controllers/authCotrollers');

router.post("/", userLogin);

module.exports = router;