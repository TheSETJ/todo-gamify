angular.module('todoGamify').controller('TodoController', function() {
  var todoCtrl = this;
  
  todoCtrl.activeTodoList = [];
  todoCtrl.finishedTodoList = [];
  todoCtrl.input = {
    brief: null,
    detail: null,
    priority: "low"
  };
  
  // load lists from local storage
  todoCtrl.load = function load() {
    var content = null;
    
    // convert and load data into active todo list, if data is not null
    content = window.localStorage.getItem("todo-gamify-atl");
    
    if(content != null) {
      todoCtrl.activeTodoList = JSON.parse(content);
    }
    
    // convert and load data into finished todo list, if data is not null
    content = window.localStorage.getItem("todo-gamify-ftl");
    
    if(content != null) {
      todoCtrl.finishedTodoList = JSON.parse(content);
    }
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
  
  // insert input into active todo list
  todoCtrl.addTodo = function addTodo() {
    todoCtrl.input.dateCreated = Date.now();
    
    todoCtrl.activeTodoList.push(todoCtrl.input);
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
    todoCtrl.finishedTodoList.push(todo);
    todoCtrl.save();
  };
  
  todoCtrl.load();
});