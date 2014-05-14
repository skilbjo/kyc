$("#listcompanies").on("click", function(event) {
 var id = event.srcElement.attr("id");
  $.ajax({
    type: "POST",
    timeout: 50000,
    url: "/companies/257",
      data: {"name":"bernhard","phone":"22341234" },
    success: function (data) {
        document.getElementById("testimg2").src = data
        //console.log(JSON.stringify(data))
        return false;
    }
    error:function(msg){
 }