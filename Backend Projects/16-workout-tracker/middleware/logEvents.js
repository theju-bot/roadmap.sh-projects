const dayjs = require('dayjs');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
const dateTime = dayjs().format('DD MMMM YYYY\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsDir = path.join(__dirname, '..', 'logs');
    const logFile = path.join(logsDir, logName);

    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    let existingLogs = '';

    if (fs.existsSync(logFile)) {
      existingLogs = await fsPromises.readFile(logFile, 'utf8');
    }

    await fsPromises.writeFile(logFile, logItem + existingLogs);

  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    'reqLog.txt'
  );
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
