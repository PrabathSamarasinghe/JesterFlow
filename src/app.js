const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const csrfCookieSecret = process.env.CSRF_COOKIE_SECRET ||
  (process.env.NODE_ENV === 'test' ? 'test-csrf-cookie-secret' : 
   process.env.NODE_ENV === 'production' ? undefined : 'dev-csrf-cookie-secret');

if (!csrfCookieSecret) {
  throw new Error('CSRF_COOKIE_SECRET environment variable must be set for production');
}

const app = express();
const path = require('path');

app.use(express.json());
app.use(cookieParser(csrfCookieSecret));
app.use(csurf({
  cookie: {
    signed: true,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Import routes
const userRoutes = require('./user');
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }

  next(err);
});

module.exports = app;
