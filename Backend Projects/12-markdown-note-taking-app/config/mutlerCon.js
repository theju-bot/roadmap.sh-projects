const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to save uploaded files
  },
  filename: function (req, file, cb) {
    // rename file to avoid duplicates
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// only accept Markdown files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
    cb(null, true);
  } else {
    cb(new Error('Only Markdown (.md) files are allowed!'), false);
  }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
