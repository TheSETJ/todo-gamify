// = requirements ==========

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// =========================
// = app setup =============

var app = express();

mongoose.connect('mongodb://user:pass@jello.modulusmongo.net:27017/ij4ytUne');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// =========================
// = data model ============

var Todo = mongoose.model('Todo', {
  brief: String,
  detail: String,
  priority: String,
  dateCreated: Date,
  isFinished: Boolean
});

// =========================
// = api routes ============

app.get('/lists', function(request, response) {
  fs.readFile('./db/todo-gamify.json', function(error, chunk) {
    if(error) {
      response.send(error);
    } else {
      response.send(chunk);
    }
  });
});

app.post('/lists', function(request, response) {
  var temp = JSON.stringify(request.body, null, 2);
  
  fs.createWriteStream('./db/todo-gamify.json').write(temp, function(error) {
    if(error) {
      response.send(error);
    } else {
      response.send("success");
    }
  });
});

// =========================
// = server config =========

var port = process.env.PORT || 8081;
app.listen(port, function() {
  console.log("Running Express on port " + port);
});

// =========================