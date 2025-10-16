const express = require('express');
const router = express.Router();
const { deleteData } = require('../utils/updateData');

router.get('/', async (req, res) => {
    const id = req.query.id;
    await deleteData(id);
    res.redirect('/admin');
});

module.exports = router;