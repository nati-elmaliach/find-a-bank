const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const banksRoutes = require('./routes/banksRoutes');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/bank', banksRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../', 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
