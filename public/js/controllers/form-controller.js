angular.module('todoGamify').controller('FormController', function() {
  var formCtrl = this;
  
  $('#priority-wrapper').find('label').on('click', function() {
    $('#priority-wrapper').find('label').removeClass('active');
    $(this).addClass('active');
    $(this).css('checked', 'checked');
  });
});