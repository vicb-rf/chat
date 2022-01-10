const jwt = require('jsonwebtoken');
const { io } = require('../../app');

const { Usuarios } = require('./usuarios');
const { grabarSala, grabarMensaje } = require('../db/grabarsala');

const usuarios = new Usuarios();

const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    };
}

io.use((socket, next) => {
    
    try {
      const { token } = socket.handshake.query;
      console.log('token socket: ', token)
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      if(!uid){
          console.log('token no valido en socket');
        return socket.disconnect();
      }
      //console.log('uid', uid)
      socket.userId = uid;
      next();
    } catch (err) {
        console.log('Token no valido', err);
      next(new Error(err.message));
    }
});

io.on('connection', (client) => {
    //console.log('client:', client)   
    try{
        client.on('entrarChat', (data, callback) => {
            //console.log('se conecto', data, client.userId);
            if(!data.nombre || !data.sala){
                return callback({
                    error: true,
                    mensaje: 'Error en nombre/sala'
                });
            }
    
            //console.log('se conecto', client);
            grabarSala(client, data);
    
            client.join(data.sala);
    
            //console.log(client.rooms);    
            usuarios.agregarPersona(client.id, data.nombre, data.sala);
            client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
            client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } se unió`));
            callback(usuarios.getPersonasPorSala(data.sala));
        });
    
        client.on('crearMensaje', (data, callback) => {
            let persona = usuarios.getPersona(client.id);
            let mensaje = crearMensaje(persona.nombre, data.mensaje);
            //console.log('mensaje rx', data);
    
            client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);     
            grabarMensaje(client, data);   
            callback(mensaje);
            
        })
    
         client.on('disconnect', () => {
            let personaBorrada = usuarios.borrarPersona(client.id);      
            console.log(typeof('personaBorrada', personaBorrada));  
            if(!personaBorrada){
                return console.log('no has usuarios conectados')
            }
            client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} se fue` ));
            client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
            console.log('se desconecto', personaBorrada.nombre);
        })    
    }
    catch(err){
        console.log('Error en socket', err);
        next(new Error(err.message));
    }
   
});