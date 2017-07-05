var c = {
  host: 'localhost',
  port: 8000,
};

if (window.config) {
  module.exports = Object.assign(c, window.config);
} else {
  module.exports = c;
}
