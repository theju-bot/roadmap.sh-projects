const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');  

require('dotenv').config();
const PORT = process.env.PORT || 5000;

// built-in middleware for json 
app.use(express.json());

// connec to mongoDB
connectDB();

// routes
app.use('/blog', require('./routes/api/blog'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
