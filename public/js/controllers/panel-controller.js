angular.module('todoGamify').controller('PanelController', function(sharedProperties) {
  var panelCtrl = this;
  
  // select first tab as default
  sharedProperties.setTab(1);
  
  // select given tab
  panelCtrl.selectTab = function selectTab(tabId) {
    sharedProperties.setTab(tabId);
  };
  
  // check whether given tab is selected or not
  panelCtrl.isSelected = function isSelected(tabId) {
    return sharedProperties.getTab() === tabId;
  };
});