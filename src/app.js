const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const csrfCookieSecret = process.env.CSRF_COOKIE_SECRET ||
  (process.env.NODE_ENV === 'test' ? 'test-csrf-cookie-secret' : undefined);

if (!csrfCookieSecret) {
  throw new Error('CSRF_COOKIE_SECRET environment variable must be set');
}

const app = express();

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
