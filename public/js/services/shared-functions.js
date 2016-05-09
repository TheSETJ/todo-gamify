angular.module('todoGamify').service('sharedFunctions', function() {
  var profileHandler;
  var dataLoader;
  
  return {
    handleProfile: function handleProfile() {
      profileHandler();
    },
    setProfileHandler: function setProfileHandler(handler) {
      profileHandler = handler;
    },
    loadData: function loadData() {
      dataLoader();
    },
    setDataLoader: function setDataLoader(loader) {
      dataLoader = loader;
    },
  };
});