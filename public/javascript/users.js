$(document).ready(function() {
  $('#listcompanies').on('click', function(e) {
    e.preventDefault();
    var companyId = e.target.id;
    $.ajax({
      url: '/companies/'+companyId,
      type: 'POST',
      timeout: 3000,
      data: { 'company': companyId,
              'user'   :'1' },
      error: alert('didnt work out so well...')
    })
  });
});