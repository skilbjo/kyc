// $(document).ready(function() {
//   $('form').on('submit', function(e) {
//     e.preventDefault();
//     $.ajax($('form').attr('action'), {
//       type: 'POST',
//       data: $('form').serialize(),
//       success: function (data) { console.log('success'); },
//       timeout: 3000,
//       error: function(request, errorType, errorMessage) { alert(errorType); },
//       complete: function() { console.log('stuff') }
//     });
//   });
// });

$(document).ready(function() {
  $('#listcompanies').on('click', function(e) {
    e.preventDefault();
    var companyId = e.target.id;
    $.ajax({
      url: '/companies/'+companyId,
      type: 'POST',
      timeout: 3000,
      data: { 'company': companyId,
              'user'   :'0' },
      error: alert('didnt work out so well...');
    })
  });
});