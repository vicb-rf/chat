'use strict'
$(document).ready(function () {

  // LOGIN 
  $('#log').on('submit', (e) => {
    e.preventDefault();
    var email = $('#email').val();
    var password = $("#password").val();
    var jsondata = JSON.stringify({ email, password });
    $.ajax({
      url: "http://localhost:3000/auth/login",
      type: "POST",
      contentType: "application/json",
      data: jsondata,
      dataType: 'json',
      success: function (response) {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombre', response.nombre);
        window.location = 'chat.html';
      },
      error: function (err) {          
        $("#resultDiv").html('<p>Usuario/password incorrecto</p>');
      }
    })
  });

  // GET 
  $('#getUsuarios').on('click', () => {
    $.ajax({
      url: "http://localhost:3000/usuarios/users",
      type: "GET",
      beforeSend: function (xhr) {
        if (localStorage.token) {
          xhr.setRequestHeader('Authorization', localStorage.token)
        }
      },
      success: function (response) {
        $("#respNombre").append("<p>" + response.nombre + "</p>")
        response.usuarios.forEach(e => {
          $("#respDiv").append("<p>" + e.nombre + "   " + e.email + "</p>");
        });
      },
      error: function () {
        alert("Sorry, you are not logged in.")
      }
    });
  });

  //LOGOUT
  $('#logout').on('click', () => {
    localStorage.clear();
  });  

})