process.on('unhandledRejection', (reason, p) => {
  console.error(reason);
  console.error(p);
});

require('./src/server.js')();
