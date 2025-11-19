const express = require('express');
const notes = require('../../controllers/notesController');
const upload = require('../../config/mutlerCon');
const router = express.Router();

router.route('/')
    .get(notes.showNotes)
    .post(upload.single('file'), notes.markdownFileUploader);

router.route('/checkGrammer').get(notes.checkGrammer);
router.route('/:id').get(notes.htmlViewer);

module.exports = router;
