const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(logger);

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// connect to mongoDB
connectDB();

// routes
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/api/workout', require('./routes/api/workoutApi'));
app.use('/logout', require('./routes/logout'))

// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
