angular.module('todoGamify').service('sharedProperties', function() {
  var currentTab;
  var currentPriority;
  
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
    }
  };
});