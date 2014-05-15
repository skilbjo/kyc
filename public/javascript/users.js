$(document).ready(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    $.ajax($('form').attr('action'), {
      type: 'POST',
      data: $('form').serialize(),
      success: function (data) { console.log('success'); },
      timeout: 3000,
      error: function(request, errorType, errorMessage) { alert(errorType); },
      complete: function() { console.log('stuff') }
    });
  });
});