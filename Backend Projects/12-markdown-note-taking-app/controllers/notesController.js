const mutler = require('multer');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const axios = require('axios');

const markdownFileUploader = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    const filePath = req.file.path;
    const mdContent = fs.readFileSync(filePath, 'utf-8');

    const response = await axios.post(
      'https://api.languagetool.org/v2/check',
      new URLSearchParams({ text: mdContent, language: 'en-US' }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 10000,
      }
    );

    const grammerIssues = response.data.matches.map((issue) => ({
      message: issue.message,
      offset: issue.offset,
      length: issue.length,
      replacements: issue.replacements.map((r) => r.value),
      rule: issue.rule.id,
    }));

    const htmlContent = marked(mdContent);

    const jsonPath = path.join(__dirname, '..', 'model', 'Files.json');
    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([]));
    }

    const json = fs.readFileSync(jsonPath, 'utf-8');
    const arr = JSON.parse(json);

    const file = {
      originalName: req.file.originalname,
      savedAs: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      html: htmlContent,
      id: arr.length > 0 ? arr[arr.length - 1].id + 1 : 1,
      grammerIssues,
    };

    fs.writeFileSync(jsonPath, JSON.stringify([...arr, file], null, 2));

    return res.status(200).json({
      message: 'File uploaded successfully!',
      file,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error!', error: err.message });
  }
};

const showNotes = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jsonPath = path.join(__dirname, '..', 'model', 'Files.json');

    if (!fs.existsSync(jsonPath)) {
      return res.status(404).json({ message: 'No notes found!' });
    }

    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const notes = JSON.parse(jsonData);

    const total = notes.length;
    const totalPages = Math.ceil(total / limit);

    const paginatedNotes = notes.slice(skip, skip + limit);

    const formatted = paginatedNotes.map((note) => ({
      id: note.id,
      originalName: note.originalName,
      savedAs: note.savedAs,
      size: `${(note.size / 1024).toFixed(2)} KB`,
      totalIssues: note.grammerIssues?.length || 0,
      preview: note.html.slice(0, 120) + '...',
    }));

    res.status(200).json({
      data: formatted,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error!', error: err.message });
  }
};

const checkGrammer = (req, res) => {
  try {
    const jsonPath = path.join(__dirname, '..', 'model', 'Files.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const notes = JSON.parse(jsonData);

    if (!req.query.id) {
      return res.status(200).json({
        grammerIssues: notes.map((note) => note.grammerIssues),
      });
    }

    const note = notes.find((n) => n.id === parseInt(req.query.id));
    if (!note) {
      return res.status(404).json({ message: 'Note not found!' });
    }
    res.status(200).json({
      grammerIssues: note.grammerIssues,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error!', error: err.message });
  }
};

const htmlViewer = (req, res) => {
  const jsonPath = path.join(__dirname, '..', 'model', 'Files.json');
  const jsonData = fs.readFileSync(jsonPath, 'utf-8');
  const notes = JSON.parse(jsonData);

   const note = notes.find((n) => n.id === parseInt(req.params.id));
    if (!note) {
      return res.status(404).json({ message: 'Note not found!' });
    }
    res.render('htmlViewer', { note });
};

module.exports = { markdownFileUploader, showNotes, checkGrammer, htmlViewer };
