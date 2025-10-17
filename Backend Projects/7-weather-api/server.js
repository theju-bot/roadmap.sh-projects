const express = require('express');
const app = express();
const limiter = require('./middleware/rateLimit');

// port
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(limiter);

// routes
app.use('/weather', require('./routes/api/searchWeather'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
