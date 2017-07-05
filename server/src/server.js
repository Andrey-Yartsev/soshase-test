const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Cors = require('hapi-cors');

const db = require('./db');

module.exports = async function () {
  let server = new Hapi.Server({debug: { 'request': ['error', 'uncaught'] }});
  const swaggerOptions = {
    info: {
      'title': 'Soshase Test',
      'version': '0.1.0'
    }
  };
  server.connection({port: 8000, routes: { cors: true } });
  const models = await db(server);
  server.decorate('request', 'db', models);

  // routes
  server.route(require('./routes/default'));
  server.route(require('./routes/product'));
  server.route(require('./routes/category'));
  //

  server.register([
      {
        register: Cors,
        options: {
          origins: ['*'],
          methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          headers: ['x-request', 'x-requested-with', 'authorization', 'Content-Type']
        }
      },

      Inert,
      Vision,
      {
        'register': HapiSwagger,
        'options': swaggerOptions
      }],
    (err) => {
      if (err) console.error('Error', err);
      server.start((serverErr) => {
        if (serverErr) {
          console.error(serverErr);
        } else {
          console.log('Server running at:', server.info.uri);
        }
      });
    }
  );
};
