var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

function renderizarUsuarios(personas){
    var html = '';
    html += '<a>Contactos:</a>';
    html += '<li>';    
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '    <a><span>' + personas[i].nombre + '</span></a>';
        html += '</li>';
    }
    divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {
    
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <p>' + mensaje.nombre + '     '+ hora + '</p>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <p>' + mensaje.nombre + '      '+ hora + '</p>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '</li>';

    }
    divChatbox.append(html);
}


function scrollBottom() {

    var newMessage = divChatbox.children('li:last-child');
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

formEnviar.on('submit', function (e) {
    e.preventDefault();
    var nombre = localStorage.getItem('nombre');
    var sala = localStorage.getItem('sala', sala);

    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    socket.emit('crearMensaje', {
        sala: sala,
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});