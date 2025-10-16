const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logger = async (req, res, next) => {
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'model'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'model'));
    }
    if (!fs.existsSync(path.join(__dirname, '..', 'model', 'log.json'))) {
      await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'log.json'),
        '[]'
      );
    }
  } catch (err) {
    console.log(err);
  }
  const log = await fsPromises
    .readFile(path.join(__dirname, '..', 'model', 'log.json'))
    .then((data) => JSON.parse(data));

  const obj = {
    request: req.method,
    url: req.url,
    time: req.time,
  };

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'log.json'),
    JSON.stringify([obj, ...log], null, 2)
  );
  next();
};

module.exports = logger;
