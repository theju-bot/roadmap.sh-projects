const URL = require('../model/URL');

const addURL = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const newURL = await URL.create({
      url,
      shortCode:
        Date.now().toString(36) + Math.random().toString(36).substring(2),
    });

    res.status(201).json({
      id: newURL.id,
      url: newURL.url,
      shortCode: newURL.shortCode,
      createdAt: newURL.createdAt,
      updatedAt: newURL.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const showURL = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await URL.findOne({ shortCode });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.accessCount++;
    await url.save();

    res.status(200).json({
      id: url.id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const updateURL = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    newURL = req.body.url;
    const url = await URL.findOne({ shortCode });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.accessCount++;
    url.url = newURL;
    await url.save();

    res.status(200).json({
      id: url.id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteURL = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const result = await URL.deleteOne({ shortCode });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'URL not found' });
    }

    return res.status(200).json({ message: 'URL deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const showStatusURL = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await URL.findOne({ shortCode });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.accessCount++;
    await url.save();

    res.status(200).json({
      id: url.id,
      url: url.url,
      shortCode: url.shortCode,
      accessCount: url.accessCount,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addURL, showURL, updateURL, deleteURL, showStatusURL };
