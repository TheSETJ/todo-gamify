angular.module('todoGamify').controller('ProfileController', function($scope, $rootScope, sharedProperties, sharedFunctions) {
  var profileCtrl = this;
  
  profileCtrl.user = {
    name: null,
    avatar: null,
    points: null,
    maxPoint: null,
    level: null,
    progress: null
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
  
  // initialize profile with user data
  function init() {
    var userData = sharedProperties.getUser();
    var access_token = client.getAccessToken();
    var max = profileCtrl.user.maxPoint;
    
    $scope.safeApply(function() {
      profileCtrl.user.name = userData.alias;
      profileCtrl.user.points = userData.scores[0].value;
      profileCtrl.user.level = userData.scores[1].value.name;
      profileCtrl.user.avatar = 'https://api.playlyfe.com/v1/assets/players/' + userData.id + '?size=medium&access_token=' + access_token;
      profileCtrl.user.maxPoint = userData.scores[1].meta.high;
      profileCtrl.user.progress = ( ( profileCtrl.user.points - userData.scores[1].meta.low ) / userData.scores[1].meta.high * 100 );
      
      if(profileCtrl.user.level == "DOever") {
        profileCtrl.user.progress = 100;
      }
      
      if(max != profileCtrl.user.maxPoint && max != null) {
        alert("Level up");
      }
    });
  }
  
  sharedFunctions.setProfileHandler(init);
});