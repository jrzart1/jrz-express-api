const express = require('express');
const Err = require('jrz-errors');
const { loggerMiddleware } = require('jrz-logger');

const common = require('./resources/common');

const router = express.Router();

router.use(loggerMiddleware);

router.get(
  '/common/:id',
  common.validateHeader.clientId,
  common.validateHeader.operationId,
  module.exports = (req, res) => res.json({ success: true })
);

router.get(
  '/healths',
  module.exports = (req, res) => {
    console.log('UP');
    return res.json({ success: true });
  }
);

router.use(Err.errorHandlerMW);
router.all('*', Err.errorNotFound);

module.exports = router;
