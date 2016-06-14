angular.module('todoGamify').controller('TodoController', function($scope, $mdDialog, $http, sharedProperties, sharedFunctions) {
  var todoCtrl = this;
  
  todoCtrl.activeTodoList = [];
  todoCtrl.finishedTodoList = [];
  todoCtrl.input = {
    uid: null,
    brief: null,
    detail: null,
    priority: "low",
    creation: null,
    isFinished: false
  };
  
  // helper function that act safely as $apply
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
  
  // helper function to display confirm
  $scope.confirm = function() {
    var dialog = $mdDialog.confirm({
      title: 'Wait...',
      textContent: 'If you cancel this task, you will lose its points. Are you sure?',
      areaLabel: 'Cancel confirm',
      ok: 'Do it!',
      cancel: 'I don\'t lose points!'
    });
    
    $mdDialog.show(dialog)
    .then(function() {
      $scope.confirmed = true;
    }, function() {
      $scope.confirmed = false;
    });
  };
  
  // helper function to display alert
  $scope.alert = function(message) {
    var dialog = $mdDialog.alert({
      title: 'Oops...',
      textContent: message,
      areaLabel: 'Error alert',
      ok: 'I try later'
    });
    
    $mdDialog.show(dialog);
  };
  
  // insert input into active todo list
  todoCtrl.addTodo = function addTodo() {
    $('.loader-box').show();
    
    todoCtrl.input.creation = Date.now();
    todoCtrl.input.uid = sharedProperties.getUser().id;
    
    // send new todo to server
    $http.post('/api/todos', todoCtrl.input)
    .then(function(response) {
      todoCtrl.activeTodoList.unshift(response.data);
      
      // reset input
      todoCtrl.input = {
        uid: null,
        brief: null,
        detail: null,
        priority: "low",
        creation: null,
        isFinished: false,
      };
      
      // select active list tab and low priority
      sharedProperties.setTab(1);
      sharedProperties.setPriority('l');
    }, function(error) {
      // insure error status text is not empty
      if(!error.statusText) {
        error.statusText = "Unknown Error. Please Check Your Connection.";
      }
      
      $scope.alert(error.status + ": " + error.statusText);
      console.log(error);
    })
    .finally(function() {
      $('.loader-box').hide();
    });
  };
  
  // delete todo from its list
  todoCtrl.deleteTodo = function deleteTodo(list, todo, signal) {
    var index = list.indexOf(todo);
    
    var deleteIt = function() {
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
        
        $scope.alert(error.status + ": " + error.statusText);
        console.log(error);
      })
      .finally(function() {
        $('.loader-box').hide();
      });
    };
    
    // cancel or delete?
    if(signal) {
      // if cancel then get confirmation
      $scope.confirm();
      
      // wait till user answers
      var checkAnswer = setInterval(function() {
        if($scope.confirmed !== undefined) {
          if($scope.confirmed) {
            deleteIt();
          }
          
          // reset value
          $scope.confirmed = undefined;
          
          clearInterval(checkAnswer);
        }
      }, 500);
      
    } else {
      // if delete then do it
      deleteIt();
    }
  };
  
  // remove todo from active todo list and insert it into finished todo list
  todoCtrl.finishTodo = function finishTodo(todo) {
    var index = todoCtrl.activeTodoList.indexOf(todo);
    var action = todo.priority + "_priority";
    
    $('.loader-box').show();
    
    // send update request to server
    $http.put('/api/todos/' + todo._id)
    .then(function(response) {
      // trigger action
      client.api('/action/play', 'POST', {
        id: action
      }, function(data) {
        // on server and trigger success move todo from active todo list into finished todo list
        todoCtrl.activeTodoList.splice(index, 1);
        todoCtrl.finishedTodoList.unshift(response.data);
        
        // refresh profile
        client.api('/player', 'GET', function(data) {
          sharedProperties.setUser(data);
          sharedFunctions.handleProfile();
          
          $('.loader-box').hide();
        });
        
        // switch to finished list tab
        sharedProperties.setTab(2);
      });
      
    }, function(error) {
      // insure error status text is not empty
      if(!error.statusText) {
        error.statusText = "Unknown Error. Please Check Your Connection.";
      }
      
      $scope.alert(error.status + ": " + error.statusText);
      console.log(error);
    });
  };
  
  // get all todos from server
  function init() {
    var id = sharedProperties.getUser().id;
    
    $http.get('/api/todos/' + id)
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
      
      $scope.alert(error.status + ": " + error.statusText);
      console.log(error);
    })
    .finally(function() {
      $('.loader-box').hide();
      $('.app-box').fadeIn(1000);
    });
  }
  
  sharedFunctions.setDataLoader(init);
});