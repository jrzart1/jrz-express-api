const nodemon = require('../nodemon');

const loadEnvs = () => Object
  .keys(nodemon.env)
  .map((env) => {
    process.env[env] = nodemon.env[env];
    process.env.NODE_ENV = 'Test';
    return env;
  });

module.exports = {
	loadEnvs
};
