const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { connect } = require('jrz-mongodb');
const { makeLogger, loggerMiddleware } = require('jrz-logger');

const routes = require('./src/router');

const app = express();

app.use(
  morgan('tiny'),
  helmet(),
  cors(),
  bodyParser.json({
  	limit: `${process.env.PAYLOAD_SIZE}mb`,
  	extended: true
  }),
  loggerMiddleware,
  routes,
);

const logger = makeLogger(process.pid);
// connect(process.env.MONGODB_HOST);
app.listen(process.env.PORT);

logger.info('UP');
module.exports = app;
