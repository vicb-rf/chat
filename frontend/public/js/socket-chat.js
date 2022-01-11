var token = localStorage.getItem('token');
var nombre = localStorage.getItem('nombre');

var socket = io("http://localhost:3000/", { query: { token } });


socket.on('connect', function () {

    //console.log('Conectado al servidor', socket.id);
    $('#chat').on('submit', (e) => {
        e.preventDefault();
        var sala = $('#sala').val();
        $('#exampleModal').modal('hide');
        $('#main-wrapper').show();
        $('#ingresarChat').hide();
        $('#salaIn').html(`<h3 class="box-title">${nombre} -- conectado a Sala: ${sala}</h3>`)
        localStorage.setItem('sala', sala);

        var usuario = {
            nombre,
            sala
        };
        socket.emit('entrarChat', usuario, function (resp) {
            //console.log('Usuarios conectados', resp);
            renderizarUsuarios(resp);
        });
    });
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor'); 
});

socket.on('crearMensaje', function (mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

socket.on('listaPersona', function (personas) {   
    renderizarUsuarios(personas);
});

const btnSalir   = document.querySelector('#btnSalir');

btnSalir.addEventListener('click', ()=> {
    localStorage.removeItem('token');
    window.location = 'index.html';
});


