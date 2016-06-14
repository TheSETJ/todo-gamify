angular.module('todoGamify').controller('ProfileController', function($scope, $mdDialog, sharedProperties, sharedFunctions) {
  var profileCtrl = this;
  
  profileCtrl.user = {
    name: null,
    avatar: null,
    points: {
      value: null,
      min: null,
      max: null
    },
    level: {
      name: null,
      progress: null,
      description: null
    },
    achievements: []
  };
  
  profileCtrl.badge = {
    name: null,
    description: null
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
    
    var oldLevel = profileCtrl.user.level.name;
    var scores = userData.scores;
    var bound = scores.length;
    
    console.log(userData);
    
    $scope.safeApply(function() {
      profileCtrl.user.name = userData.alias;
      profileCtrl.user.avatar = 'https://api.playlyfe.com/v1/assets/players/' + userData.id + '?size=medium&access_token=' + access_token;
      
      // extract scores' data
      for(var i = 0; i < bound; i++) {
        var typeOfScore = scores[i].metric.id;
        
        switch(typeOfScore) {
          case "achievements":
            var index = 0;
            var badges = scores[i].value;
            
            for(var name in badges) {
              profileCtrl.badge.name = name; // badge name
              profileCtrl.badge.description = badges[name].description; // badge description
              profileCtrl.user.achievements[index] = profileCtrl.badge; // put badge in achievements
              
              // reset badge
              profileCtrl.badge = {
                name: null,
                description: null
              };
              
              index++;
            }
            break;
          case "do_plus":
            profileCtrl.user.points.value = scores[i].value; // DO+
            break;
          case "todo_mastery_collection":
            profileCtrl.user.level.description = scores[i].value.description; // level description
            profileCtrl.user.level.name = scores[i].value.name; // level name
            profileCtrl.user.points.max = scores[i].meta.high; // DO+ high bound
            profileCtrl.user.points.min = scores[i].meta.low; // DO+ low bound
            break;
        }
        
        if(profileCtrl.user.level.name == "DOever") {
          profileCtrl.user.level.progress = 100; // no more progress in highest level
        } else {
          var points = profileCtrl.user.points;
          
          profileCtrl.user.level.progress = ( ( points.value - points.min ) / ( points.max - points.min ) * 100 );
        }
      }
      
      // if level change from last check display level up dialog
      if(oldLevel != profileCtrl.user.level.name && oldLevel != null) {
        $mdDialog.show({
          template:
          '<md-dialog aria-label="Level up dialog">' +
          '  <md-toolbar class="md-primary">' +
          '    <div class="md-toolbar-tools">' +
          '      <h2>Congratulations!</h2>' +
          '      <span flex></span>' +
          '    </div>' +
          '  </md-toolbar>' +
          '  <md-dialog-content>' +
          '    <div class="md-dialog-content">' +
          '      You reached level <kbd>' + profileCtrl.user.level.name + '</kbd>' +
          '    </div>' +
          '  </md-dialog-content>' +
          '  <md-dialog-actions>' +
          '    <md-button ng-click="hide()" class="md-primary md-raised">' +
          '      Hurray!' +
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
      }
    });
  }
  
  sharedFunctions.setProfileHandler(init);
});