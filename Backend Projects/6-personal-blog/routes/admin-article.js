const express = require('express');
const router = express.Router();
const fetchData = require('../utils/fetchData');

router.get('/:id', async (req, res) => {
  const articles = await fetchData();
  const article = articles.find((item) => item.id === Number(req.params.id));

  if (!article) {
    return res.status(404).send('Article not found');
  }

  res.render('admin-article', { article });
});

module.exports = router;
