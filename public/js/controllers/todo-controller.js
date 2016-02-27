angular.module('todoGamify').controller('TodoController', function() {
  var todoCtrl = this;
  
  todoCtrl.activeTodoList = [];
  todoCtrl.finishedTodoList = [];
  todoCtrl.input = {
    brief: null
  };
  
  // load lists from local storage
  todoCtrl.load = function load() {
    var content = null;
    
    // convert and load data into active todo list, if there is no data then load in an empty array 
    content = window.localStorage.getItem("todo-gamify-atl") || [];
    todoCtrl.activeTodoList = JSON.parse(content);
    
    // convert and load data into finished todo list, if there is no data then load in an empty array 
    content = window.localStorage.getItem("todo-gamify-ftl") || [];
    todoCtrl.finishedTodoList = JSON.parse(content);
  };

  todoCtrl.load();  
});