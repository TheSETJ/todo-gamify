angular.module('todoGamify', []);

angular.module('todoGamify').run(function() {
  client = new Playlyfe.init({
    client_id: 'Y2M3YjkzYjYtMjI1OC00ZWFhLWI1MzctNzNiZjRkYzhhOGI4',
    redirect_uri: 'https://todo-gamify-thesetj.c9users.io/',
    version: 'v1'
  });
});