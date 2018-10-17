const mongoose = require('mongoose');
const config = require('./../config');

mongoose.connect(
  config.connectionString,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
