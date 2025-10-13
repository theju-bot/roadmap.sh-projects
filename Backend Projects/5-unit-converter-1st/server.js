const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root '/' to '/length'
app.get('/', (req, res) => {
  res.redirect('/length');
});

// routes
app.use('/length', require('./routes/length'));
app.use('/weight', require('./routes/weight'));
app.use('/temperature', require('./routes/temperature'));
app.use('/calculations', require('./routes/calculations'));
app.use('/middleware/getResults', require('./middleware/getResults'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
