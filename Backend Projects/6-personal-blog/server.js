const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const logger = require('./middleware/logger');
const dateTime = require('./middleware/dateTime');
const auth = require('./middleware/auth');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// server side rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(dateTime);
app.use(logger);

// Redirect root '/' to '/home'
app.get('/', (req, res) => {
  res.redirect('/home');
});

// routes
app.use('/home', require('./routes/homepage'));
app.use('/article', require('./routes/article'));
app.use(auth);
app.use('/admin', require('./routes/admin-homepage'));
app.use('/admin-article', require('./routes/admin-article'));
app.use('/admin-editDone', require('./routes/editDone'));
app.use('/admin-delete', require('./routes/delete'));
app.use('/admin-add', require('./routes/addDataForm'));
app.use('/addData', require('./routes/addData'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
