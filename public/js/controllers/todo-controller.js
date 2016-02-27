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
  
  // save lists to local storage
  todoCtrl.save = function save() {
    var content = null;
    
    // convert and save active todo list locally
    content = JSON.stringify(todoCtrl.activeTodoList);
    window.localStorage.setItem("todo-gamify-atl", content);
    
    // convert and save finished todo list locally
    content = JSON.stringify(todoCtrl.finishedTodoList);
    window.localStorage.setItem("todo-gamify-ftl", content);
  };
  
  todoCtrl.load();
});