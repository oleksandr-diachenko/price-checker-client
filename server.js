const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
app.use(express.static('dist/price-checker-client'));

// Add middleware for http proxying
app.use(
    '/api',
    proxy({target: 'https://price-checker-web.herokuapp.com', changeOrigin: true})
);
app.use(
    '/actuator',
    proxy({target: 'https://price-checker-web.herokuapp.com', changeOrigin: true})
);

// Render your site
const renderIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/price-checker-client/index.html'));
}
app.get('/*', renderIndex);

app.listen((process.env.PORT || 3000), () => {
    console.log('Listening on: https://price-checker-web.herokuapp.com/');
});
