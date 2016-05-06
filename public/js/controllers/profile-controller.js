angular.module('todoGamify').controller('ProfileController', function(sharedProperties) {
  var profileCtrl = this;
  
  profileCtrl.user = {
    id: '',
    avatar: '',
    points: null,
    level: '',
    proceed: null
  };
  
  function initProfile() {
    var points;
    
    profileCtrl.user.id = sharedProperties.getUsername();
    
    client.api('/assets/players/' + profileCtrl.user.id, 'GET', function(data) {
      profileCtrl.user.avatar = data;
    });
    
    client.api('/player', 'GET', function(data) {
      profileCtrl.user.points = points = data.scores[0].value;
      profileCtrl.user.level = data.scores[1].value.name;
      
      if(points <= 100) {
        profileCtrl.user.proceed = points.toFixed(2);
      } else if(points <= 250) {
        profileCtrl.user.proceed = ( ( points - 100 ) * 100 / 150 ).toFixed(2);
      } else if(points <= 500) {
        profileCtrl.user.proceed = ( ( points - 250 ) * 100 / 250 ).toFixed(2);
      } else {
        profileCtrl.user.proceed = '100';
      }
    });
  }
  
  initProfile();
});