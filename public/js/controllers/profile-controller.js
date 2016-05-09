angular.module('todoGamify').controller('ProfileController', function($scope, sharedProperties, sharedFunctions) {
  var profileCtrl = this;
  
  profileCtrl.user = {
    name: '',
    avatar: '',
    points: '',
    maxPoint: '',
    level: '',
    progress: ''
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
    
    $scope.safeApply(function() {
      profileCtrl.user.name = userData.alias;
      profileCtrl.user.points = userData.scores[0].value;
      profileCtrl.user.level = userData.scores[1].value.name;
      profileCtrl.user.avatar = 'https://api.playlyfe.com/v1/assets/players/' + userData.id + '?size=medium&access_token=' + access_token;
      profileCtrl.user.maxPoint = userData.scores[1].meta.high;
      profileCtrl.user.progress = (( profileCtrl.user.points - userData.scores[1].meta.low ) / userData.scores[1].meta.high * 100);
    });
    
    console.log(profileCtrl.user);
  }
  
  sharedFunctions.setProfileHandler(init);
});