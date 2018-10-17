const express = require('express');
const { json, urlencoded } = require('body-parser');
const mongoose = require('./database');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: false }));

const TelephoneBook = require('./app/models/telephone-book');
const Auth = require('./app/models/auth');

const indexRoute = require('./app/routes/index.route');
const telephoneBookRoute = require('./app/routes/telephone-book.route');
const authRoute = require('./app/routes/auth.route');

app.use('/', indexRoute);
app.use('/telephone-book', telephoneBookRoute);
app.use('/auth', authRoute);

module.exports = app;
