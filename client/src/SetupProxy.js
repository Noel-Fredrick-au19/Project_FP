const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', { target: 'http://[::1]:5000/' }));
    app.use(createProxyMiddleware('/public', { target: 'http://[::1]:5000/' }));
    }
