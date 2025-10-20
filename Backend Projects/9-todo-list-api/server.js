const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(logger);

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// connec to mongoDB
connectDB();

// routes
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

app.use('/todos', require('./routes/api/todo'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
