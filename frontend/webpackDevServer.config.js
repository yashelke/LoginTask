const config = {
  allowedHosts: 'all',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '/api': 'http://localhost:5000'
  }
};

module.exports = config;