angular.module('todoGamify').controller('MainController', function($scope, sharedProperties) {
  var main = this;
  
  main.loggedIn = false;
  main.token;
  
  // helper function that act safly as $apply
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
  
  // check if player is logged in or net
  if(Playlyfe.getStatus().msg != 'authenticated') {
    main.loggedIn = false;
  } else {
    main.loggedIn = true;
  }
});