const Hapi = require('hapi');

const routes = require('./routes/default');

module.exports = async function () {
  let server = new Hapi.Server();
  server.connection({port: 8000});
  server.route(routes);
  server.register([],
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
