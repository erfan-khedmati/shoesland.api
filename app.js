const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;