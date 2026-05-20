const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(csurf({ cookie: true }));

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
