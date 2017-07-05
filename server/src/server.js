const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const routes = require('./routes/default');
const db = require('./db');

module.exports = async function () {
  let server = new Hapi.Server({debug: { 'request': ['error', 'uncaught'] }});
  const swaggerOptions = {
    info: {
      'title': 'Soshase Test',
      'version': '0.1.0'
    }
  };
  server.connection({port: 8000});
  const models = await db(server);
  server.decorate('server', 'db', models);
  server.route(routes);
  server.register([
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
