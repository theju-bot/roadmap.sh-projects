const express = require('express');
const router = express.Router();
const urlShorternerController = require('../../controllers/urlShorternerController');

router.post('/', urlShorternerController.addURL);
router
    .route('/:shortCode')
    .get(urlShorternerController.showURL)
    .put(urlShorternerController.updateURL)
    .delete(urlShorternerController.deleteURL);
router.get('/:shortCode/stats', urlShorternerController.showStatusURL);

module.exports = router;