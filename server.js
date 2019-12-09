var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var backend = 'https://price-checker-web.herokuapp.com/',
    frontend = 'https://magazine-price-checker.herokuapp.com/';

app.all("/api/*", function(req, res) {
  apiProxy.web(req, res, {target: backend});
});

app.all("/*", function(req, res) {
    apiProxy.web(req, res, {target: frontend});
});

var server = require('http').createServer(app);
server.on('upgrade', function (req, socket, head) {
  apiProxy.ws(req, socket, head, {target: frontend});
});
server.listen(3000);
