const PROXY_CONFIG = {
    '/api': {
        'target': 'https://price-checker-web.herokuapp.com/',
        'secure': false,
        'logLevel': 'debug',
        'changeOrigin': true
    },
    '/actuator': {
        'target': 'https://price-checker-web.herokuapp.com/',
        'secure': false,
        'logLevel': 'debug',
        'changeOrigin': true
    }
};

module.exports = PROXY_CONFIG;
