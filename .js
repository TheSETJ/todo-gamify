var express = require('express');
var app = express();

app.use(express.static(__dirname + 'public'));

app.get('/lists', function(req, res) {
  res.send()
});

var port = process.env.PORT || 8081;
app.listen(port, function() {
  console.log("Running Express on " + port);
});