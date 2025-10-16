const express = require('express');
const router = express.Router();
const fetchData = require('../utils/fetchData');

router.get('/', async (req, res) => {
  const articles = await fetchData();
  res.render('admin-homepage', { articles });
});

module.exports = router;
