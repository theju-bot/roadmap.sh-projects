const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    error: 'Too many requests. Please try again later.',
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

module.exports = limiter;