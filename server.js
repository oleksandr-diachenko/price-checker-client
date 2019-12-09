const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use(express.static('price-checker-client'));

// Add middleware for http proxying
const apiProxy = proxy('/api', { target: 'https://price-checker-web.herokuapp.com/' });
app.use('/api', apiProxy);

// Render your site
const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'price-checker-client/index.html'));
}
app.get('/*', renderIndex);

app.listen((process.env.PORT || 3000), () => {
  console.log('Listening on: https://price-checker-web.herokuapp.com/');
});
