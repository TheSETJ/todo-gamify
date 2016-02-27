angular.module('todoGamify').controller('PanelController', function() {
  var panelCtrl = this;
  
  // select first tab as default
  panelCtrl.currentTab = 1;
  
  // select given tab
  panelCtrl.selectTab = function selectTab(tabId) {
    panelCtrl.currentTab = tabId;
  };
  
  // check whether given tab is selected or not
  panelCtrl.isSelected = function isSelected(tabId) {
    return panelCtrl.currentTab === tabId;
  };
});