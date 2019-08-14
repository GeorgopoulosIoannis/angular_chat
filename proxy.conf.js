const PROXY_CONFIG = {
	'/api': {
		target: 'https://localhost:44387/',
		secure: false,
		logLevel: 'debug',
		changeOrigin: true
	},
	ws: true
};
module.exports = PROXY_CONFIG;
