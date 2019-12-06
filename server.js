var express = require('express');
var httpProxy = require('http-proxy');
var apiForwardingUrl = 'https://price-checker-web.herokuapp.com/';
var server = express();
server.set('port', 3000);
server.use(express.static(__dirname + '/dist'));
var apiProxy = httpProxy.createProxyServer();
// Grab all requests to the server with "/space/".
server.all("/api/*", function(req, res) {
    console.log("Request made to /space/");
});

server.all("/space/*", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});
