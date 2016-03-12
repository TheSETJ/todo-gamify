angular.module('todoGamify').controller('TodoController', function($http) {
  var todoCtrl = this;
  
  todoCtrl.activeTodoList = [];
  todoCtrl.finishedTodoList = [];
  todoCtrl.input = {
    brief: null,
    detail: null,
    priority: "low"
  };
  
  // get lists from server
  todoCtrl.load = function load() {
    // load data into todo lists
    $http.get('/lists')
    .then(function(chunk) {
      console.log(chunk.data.active);
      todoCtrl.activeTodoList = chunk.data.active;
      todoCtrl.finishedTodoList = chunk.data.finished;
    })
    .finally(function() {
      console.log("ok");
    });
  };
  
  // post lists to server
  todoCtrl.save = function save() {
    var temp = {
      active: todoCtrl.activeTodoList,
      finished: todoCtrl.finishedTodoList
    };
    
    // save todo lists
    $http.post('/lists', temp)
    .finally(function() {
      console.log("ok");
    });
  };
  
  // insert input into active todo list
  todoCtrl.addTodo = function addTodo() {
    todoCtrl.input.dateCreated = Date.now();
    
    todoCtrl.activeTodoList.unshift(todoCtrl.input);
    todoCtrl.save();
    
    // reset input
    todoCtrl.input = {
      brief: null,
      detail: null,
      priority: "low"
    };
  };
  
  // delete todo from its list
  todoCtrl.deleteTodo = function deleteTodo(list, todo) {
    var index = null;
    
    index = list.indexOf(todo);
    list.splice(index, 1);
    todoCtrl.save();
  };
  
  // remove todo from active todo list and insert it into finished todo list
  todoCtrl.finishTodo = function finishTodo(todo) {
    var index = null;
    
    index = todoCtrl.activeTodoList.indexOf(todo);
    todoCtrl.activeTodoList.splice(index, 1);
    todoCtrl.finishedTodoList.unshift(todo);
    todoCtrl.save();
  };
  
  todoCtrl.load();
});