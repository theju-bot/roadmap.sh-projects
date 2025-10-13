const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const list = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'model', 'calculation.json'))
  );
  const lastObj = list[list.length - 1];
  res.send(lastObj);
});

module.exports = router;
