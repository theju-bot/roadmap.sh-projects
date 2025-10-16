const express = require('express');
const router = express.Router();
const path = require('path');

const file = path.join(__dirname,'..','views','form.html');

router.get('/', (req, res) => {
    res.sendFile(file);
})

module.exports = router;