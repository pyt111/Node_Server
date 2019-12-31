const path = require('path');

function getStaticPath() {
  return path.join(__dirname, '../', 'public')
}

module.exports = {
  getStaticPath,
};
