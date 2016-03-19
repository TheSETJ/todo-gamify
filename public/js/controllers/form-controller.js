angular.module('todoGamify').controller('FormController', function(sharedProperties) {
  var formCtrl = this;
  
  // select first tab as default
  sharedProperties.setPriority('l');
  
  // select given tab
  formCtrl.selectPriority = function selectTab(priorityId) {
    sharedProperties.setPriority(priorityId);
  };
  
  // check whether given priority is selected or not
  formCtrl.isSelected = function isSelected(priorityId) {
    return sharedProperties.getPriority() === priorityId;
  };
});