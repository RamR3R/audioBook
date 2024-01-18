const mongoose = require('mongoose');
require("dotenv").config();

const dbURI = process.env.MongoURI;
mongoose.connect(dbURI);

const connect = mongoose.connection;

connect.on('error', console.error.bind(console, 'MongoDB connection error:'));
connect.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = connect;
