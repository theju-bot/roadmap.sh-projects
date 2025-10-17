const express = require('express');
const router = express.Router();
const weather = require('../../controllers/weather');

router.get('/', weather.todayWeather);
router.get('/:city', weather.todayWeather);

module.exports = router;