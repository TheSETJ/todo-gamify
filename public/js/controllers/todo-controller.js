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
    // load data into active todo list
    $http.get('/lists/active')
    .then(function(chunk) {
      todoCtrl.activeTodoList = chunk.data;
    });
  
    // load data into finished todo list
    $http.get('/lists/finished')
    .then(function(chunk) {
      todoCtrl.finishedTodoList = chunk.data;
    });
  };
  
  // post lists to server
  todoCtrl.save = function save() {
    // save active todo list
    $http.post('/lists/active', todoCtrl.activeTodoList);
    
    // save finished todo list
    $http.post('/lists/finished', todoCtrl.finishedTodoList);
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