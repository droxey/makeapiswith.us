const mongoose = require('mongoose');
const app = require('./config/express');
const config = require('./config/config');

mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true },
);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(config.port, () => console.log(`Running on port ${config.port}. (${config.env})`)); // eslint-disable-line no-console

module.exports = app;
