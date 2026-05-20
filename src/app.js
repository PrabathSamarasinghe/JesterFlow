const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(csurf({ cookie: true }));
// Import routes
const userRoutes = require('./user');
app.use('/api/users', userRoutes);

module.exports = app;
