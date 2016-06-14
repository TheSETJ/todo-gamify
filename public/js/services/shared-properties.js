angular.module('todoGamify').service('sharedProperties', function() {
  var currentTab;
  var currentPriority;
  var user;
  
  return {
    getTab: function getTab() {
      return currentTab;
    },
    setTab: function setTab(tabId) {
      currentTab = tabId;
    },
    getPriority : function getPriority() {
      return currentPriority;
    },
    setPriority: function setPriority(priorityId) {
      currentPriority = priorityId;
    },
    getUser: function getUser() {
      return user;
    },
    setUser: function setUser(userData) {
      user = userData;
    }
  };
});