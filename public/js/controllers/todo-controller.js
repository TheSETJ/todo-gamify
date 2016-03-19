angular.module('todoGamify').controller('TodoController', ['$http', function($http) {
  var todoCtrl = this;
  
  todoCtrl.activeTodoList = [];
  todoCtrl.finishedTodoList = [];
  todoCtrl.input = {
    brief: null,
    detail: null,
    priority: "low",
    creation: null,
    isFinished: false
  };
  
  // insert input into active todo list
  todoCtrl.addTodo = function addTodo() {
    $('.loader-box').show();
    
    todoCtrl.input.creation = Date.now();
    
    // send new todo to server
    $http.post('/api/todos', todoCtrl.input)
    .then(function(response) {
      todoCtrl.activeTodoList.unshift(response.data);
      
      // reset input
      todoCtrl.input = {
        brief: null,
        detail: null,
        priority: "low",
        creation: null,
        isFinished: false,
      };
    }, function(error) {
      // insure error status text is not empty
      if(!error.statusText) {
        error.statusText = "Unknown Error. Please Check Your Connection.";
      }
      
      alert(error.status + ": " + error.statusText);
      console.log(error);
    })
    .finally(function() {
      $('.loader-box').hide();
    });
  };
  
  // delete todo from its list
  todoCtrl.deleteTodo = function deleteTodo(list, todo) {
    var index = list.indexOf(todo);
    
    $('.loader-box').show();
    
    // send todo id for deletion to server 
    $http.delete('/api/todos/' + todo._id)
    .then(function(response) {
      // on server success delete todo from list too
      list.splice(index, 1);
    }, function(error) {
      // insure error status text is not empty
      if(!error.statusText) {
        error.statusText = "Unknown Error. Please Check Your Connection.";
      }
      
      alert(error.status + ": " + error.statusText);
      console.log(error);
    })
    .finally(function() {
      $('.loader-box').hide();
    });
    
    //todoCtrl.save();
  };
  
  // remove todo from active todo list and insert it into finished todo list
  todoCtrl.finishTodo = function finishTodo(todo) {
    var index = todoCtrl.activeTodoList.indexOf(todo);
    
    $('.loader-box').show();
    
    // send update request to server
    $http.put('/api/todos/' + todo._id)
    .then(function(response) {
      // on server success move todo from active todo list into finished todo list
      todoCtrl.activeTodoList.splice(index, 1);
      todoCtrl.finishedTodoList.unshift(response.data);
    }, function(error) {
      // insure error status text is not empty
      if(!error.statusText) {
        error.statusText = "Unknown Error. Please Check Your Connection.";
      }
      
      alert(error.status + ": " + error.statusText);
      console.log(error);
    })
    .finally(function() {
      $('.loader-box').hide();
    });
  };
  
  // get all todos from server
  (function() {
    $('.app-box').hide();
    $('.loader-box').show();
    
    $http.get('/api/todos')
    .then(function(response) {
      var item = null;
      var length = response.data.length;
      
      // seperate todos
      for(var index = 0; index < length; index++) {
        item = response.data[index];
        
        item["isFinished"]
        ? todoCtrl.finishedTodoList.unshift(item)
        : todoCtrl.activeTodoList.unshift(item);
      }
    }, function(error) {
      // insure error status text is not empty
      if(!error.statusText) {
        error.statusText = "Unknown Error. Please Check Your Connection.";
      }
      
      alert(error.status + ": " + error.statusText);
      console.log(error);
    })
    .finally(function() {
      $('.loader-box').hide();
      $('.app-box').fadeIn(1000);
    });
  })();
}]);