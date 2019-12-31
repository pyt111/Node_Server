const os = require('os');
const portfinder = require('portfinder');

function getIPAddress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

function getPort() {
  portfinder.basePort = process.env.PORT || '8088';
  return portfinder.getPortPromise();
}

module.exports = {
  getIPAddress,
  getPort,
};
