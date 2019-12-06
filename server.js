const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(__dirname + '/price-checker-client'));
app.get('/*', function(req,res){
res.sendFile(path.join('dist/price-checker-client/', 'index.html'))
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
