const express = require('express');
const app = express();
const PORT = 5000;
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// server side rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/notes', require('./routes/api/notesRoute'));

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
