const Joi = require('joi');
const Err = require('jrz-errors');

const schema = {
  clientId: Joi.object({ client_id: Joi.string().trim().uuid().required() }),
  operationId: Joi.object({ operation_id: Joi.string().trim().uuid().required() }),
};

const options = {
  abortEarly: true,
  noDefaults: true,
  allowUnknown: true,
  stripUnknown: true,
};

const newError = (error) => new Err.InvalidParameterError({
  message: error.details[0].message,
  field: error.details[0].path,
});

const clientId = (req, res, next) => {
  const headers = schema.clientId.validate(req.headers, options);
  if (!headers.error) {
    req.clientId = req.get('client_id');
    return next();
  }
  return next(newError(headers.error));
};

const operationId = (req, res, next) => {
  const headers = schema.operationId.validate(req.headers, options);
  if (!headers.error) {
    req.operationId = req.get('operation_id');
    return next();
  }
  return next(newError(headers.error));
};

module.exports = { clientId, operationId };
