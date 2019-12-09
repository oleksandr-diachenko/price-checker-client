const express = require('express');
const path = require('path');
const app = express();

app.get('/api/*', function(req,res) {
  //modify the url in any way you want
  var newurl = 'https://price-checker-web.herokuapp.com/';
  request(newurl).pipe(res);
});


//// Serve static files....
//app.use(express.static(__dirname + '/dist/magazine-price-checker'));
//
//// Send all requests to index.html
//app.get('/*', function(req, res) {
//  res.sendFile(path.join(__dirname + '/dist/magazine-price-checker/index.html'));
//});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
