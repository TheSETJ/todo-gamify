// = requirements ==========

var express = require('express');
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
  creation: Date,
  isFinished: Boolean
});

// =========================
// = api routes ============

// retrieve all todos from database and send them to client
app.get('/api/todos', function(request, response) {
  Todo.find(function(error, todos) {
    if(error) {
      console.log(error);
      response.send(error);
    } else {
      console.log(todos);
      response.json(todos);
    }
  });
});

// create new instance of todo in database using gotten object from client
app.post('/api/todos', function(request, response) {
  Todo.create(request.body, function(error, todo) {
    if(error) {
      console.log(error);
      response.send(error);
    } else {
      console.log(todo);
      response.json(todo);
    }
  });
});

// update todo in database
app.put('/api/todos/:id', function(request, response) {
  Todo.findOneAndUpdate({
    _id: request.params.id
  }, {
    isFinished: true
  }, function(error, todo) {
    if(error) {
      console.log(error);
      response.send(error);
    } else {
      console.log(todo);
      response.json(todo);
    }
  });
});

// delete todo from database using passed id from client
app.delete('/api/todos/:id', function(request, response) {
  Todo.remove({
    _id: request.params.id
  }, function(error, todo) {
    if(error) {
      console.log(error);
      response.send(error);
    } else {
      console.log(todo);
      response.json(todo);
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