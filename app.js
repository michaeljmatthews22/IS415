// Configuration for the application

var express = require('express');

// If you are testing, then make sure that you use const port 3000;
const port = process.env.PORT;
//const port = 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendfile('index.html', { root: __dirname + "/public" } );
});
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
