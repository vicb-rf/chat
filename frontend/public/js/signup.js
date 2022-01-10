    'use strict'
  // REGISTER
  $('#reg').on('submit', (e) => {
    e.preventDefault();
        var nombre = $("#nombre").val();
        var email = $('#email').val();
        var password = $("#password").val();
        var jsondata = JSON.stringify({ nombre, email, password });

    $.ajax({
      url: "http://localhost:3000/usuarios/register",
      type: "POST",
      contentType: "application/json",
      data: jsondata,
      dataType: 'json',
      success: function(response) {
          $("#resultDiv").html('<p style="color:green;">' + response.msg + '</p>')
        //alert('ok', JSON.stringify(response));
      },
      error: function (err) {
        //console.log('error',  err);
        const errores = err.responseJSON;
        //console.log( errores.errors);

        var html = '';

        errores.errors.forEach(e => {
          html += '<p>';
          html += e.msg;
          html += '</p>';
          
        })
        
        $("#resultDiv").html(html);
      }
    })
  });



