const { stub } = require('sinon');
const assert = require('assert');
const { v4: uuid } = require('uuid');

const { loadEnvs } = require('./helpers');
const { validateHeader } = require('../src/resources/common');

loadEnvs();
const req = {
  body: {},
  get: stub(),
  headers: {
    client_id: uuid(),
    operation_id: uuid(),
  },
};

describe('@ A middleware that validates headers', () => {
  beforeEach(() => {
    req.headers = { client_id: uuid(), operation_id: uuid() };
  });
  it('should return a error (operation_id)', () => {
    delete req.headers.operation_id;
    validateHeader.operationId(req, null,
    	(err = {}) => assert.equal(err.message, '"operation_id" is required'));
  });

  it('should return a error (client_id)', () => {
    delete req.headers.client_id;
    validateHeader.clientId(req, null,
    	(err = {}) => assert.equal(err.message, '"client_id" is required'));
  });

  it('should accept a valid payload', () => {
    validateHeader.operationId(req, null,
    	(err = {}) => assert.equal(err.message, undefined));
    assert.equal(req.get.called, true);
    assert.equal(req.get.firstCall.args[0], 'operation_id');

    validateHeader.clientId(req, null,
    	(err = {}) => assert.equal(err.message, undefined));
    assert.equal(req.get.called, true);
    assert.equal(req.get.firstCall.args[0], 'operation_id');
  });
});
