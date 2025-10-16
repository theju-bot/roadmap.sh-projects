const dayjs = require('dayjs');

const dateTime = (req, res, next) => {
    req.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    next();
};

module.exports = dateTime;