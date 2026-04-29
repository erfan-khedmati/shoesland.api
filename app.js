const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', "Authorization"]
}))
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;