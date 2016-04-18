angular.module('todoGamify').service('sharedProperties', function() {
  var currentTab;
  var currentPriority;
  var username;
  
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
    getUsername: function getUsername() {
      return username;
    },
    setUsername: function setUsername(name) {
      username = name;
    }
  };
});