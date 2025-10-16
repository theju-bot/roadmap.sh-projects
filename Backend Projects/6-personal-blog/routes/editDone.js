const express = require('express');
const router = express.Router();
const { updateData } = require('../utils/updateData');

router.get('/', async (req, res) => {
  const id = req.query.id;
  const heading = req.query.heading;
  const description = req.query.description;
  const date = req.time;
  console.log(id, description, date);
  await updateData(id, heading, description, date);
  // const result = await updateData(id, description, date);
  res.redirect('/admin');
});

module.exports = router;
