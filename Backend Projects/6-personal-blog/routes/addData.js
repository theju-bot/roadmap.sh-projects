const express = require('express');
const router = express.Router();
const { addData } = require('../utils/updateData');

router.get('/', async (req, res) => {
    const heading = req.query.heading;
    const description = req.query.description;
    const date = req.time;
    await addData(heading, description, date);
    res.redirect('/admin');    
})

module.exports = router;