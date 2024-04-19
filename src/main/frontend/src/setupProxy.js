const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/user',
        createProxyMiddleware({
            target: 'http://localhost:8899/',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};