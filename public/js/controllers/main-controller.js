angular.module('todoGamify').controller('MainController', function($scope, $mdDialog, sharedProperties, sharedFunctions) {
  var main = this;
  
  main.loggedIn = false;
  main.token;
  
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
  
  // display help
  main.help = function help() {
    $mdDialog.show({
      template:
      '<md-dialog aria-label="Help dialog">' +
      '  <md-toolbar class="md-primary">' +
      '    <div class="md-toolbar-tools">' +
      '      <h2>About</h2>' +
      '      <span flex></span>' +
      '    </div>' +
      '  </md-toolbar>' +
      '  <md-dialog-content>' +
      '    <div class="md-dialog-content">' +
      '      <p>Welcome to <b>Todo Gamify</b>! </p>' +
      '      <p>This is a todo app like all the others, but you\'ll have more fun here.</p>' +
      '      <p>You may wonder why? I\'ll tell you.</p>' +
      '      <p>Here you add finish your tasks like all other todo apps, ' +
             'but you\'ll get reward for every task you finish and that\'s why it\'s fun. More impostant task you do, more points you\'ll get. Simple?</p>' +
      '      <p>OK! Here you are at the beginning of your task finishing journey. Go ahead and you\'ll find much more suprise in your path.</p>' +
      '      <p>Good luck!</p>' +
      '    </div>' +
      '  </md-dialog-content>' +
      '  <md-dialog-actions>' +
      '    <md-button ng-click="hide()" class="md-primary md-raised">' +
      '      I got it' +
      '    </md-button>' +
      '  </md-dialog-actions>' +
      '</md-dialog>',
      controller: function($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
      },
      clickOutsideToClose: true
    });
  };
  
  // login to app
  main.login = function login() {
    client.login();
  };
  
  // logout from app
  main.logout = function logout() {
    client.logout(function() {
      $scope.safeApply(function() {
        main.loggedIn = false;
      });
    });
  };
  
  // check if player is logged in or not
  if(Playlyfe.getStatus().msg != 'authenticated') {
    main.loggedIn = false;
  } else {
    $('.app-box').hide();
    $('.loader-box').show();
    
    // get user data from playlyfe then init the app
    client.api('/player', 'GET', function(data) {
      sharedProperties.setUser(data);
      sharedFunctions.handleProfile();
      sharedFunctions.loadData();
    });
    
    main.loggedIn = true;
  }
});