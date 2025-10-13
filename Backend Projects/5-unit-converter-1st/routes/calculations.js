const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const calculate = require('../middleware/calculations');

const json = path.join(__dirname, '..', 'model', 'calculation.json');

router.get('/', (req, res) => {
  const type = req.query.type;
  const inputValue = parseInt(req.query.number);
  const u1 = req.query.u1;
  const u2 = req.query.u2;

  const result = calculate(type, inputValue, u1, u2);
  console.log(type, inputValue, u1, u2, result);
  const list = JSON.parse(fs.readFileSync(json));
  const obj = {
    type,
    inputValue,
    u1,
    u2,
    result,
  };
  list.push(obj);
  fs.writeFileSync(json, JSON.stringify(list, null, 2));
  res.sendFile(path.join(__dirname, '..', 'views', 'calculations.html'));
});

module.exports = router;
