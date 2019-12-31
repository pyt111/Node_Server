#!/usr/bin/env node

/**
 * Module dependencies.
 */
const app = require('../app');
const debug = require('debug')('node-servers:server');
const http = require('http');
const address = require('../util/address');


/**
 * Get port from environment and store in Express.
 */
// const port = normalizePort(process.env.PORT || '9002');
(async function () {
  const hostName = process.env.HOST || address.getIPAddress() || '0.0.0.0';
  const port = await address.getPort();

  app.set('port', port);

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port,hostName,() => {
    console.log(`服务器运行在http://${hostName}:${port}`)
  });
  server.on('error', onError);
  server.on('listening', onListening);


  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
})();

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

