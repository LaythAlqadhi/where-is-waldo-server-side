const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const createError = require('http-errors');
const cors = require('cors');
require('./db/mongoConfig');

const gameRouter = require('./routes/gameRouter');

const app = express();

// Rate limiting
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});
app.use(limiter);

// Security and compression middleware
app.use(helmet());
app.use(compression());

// MongoDB connection
mongoose.set('strictQuery', false);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// URL-encoded data parsing, cookie parsing, and serving static files
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/v1', gameRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
