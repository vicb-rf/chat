const Usuario = require('../model/usuario');
const Sala = require('../model/sala');

const grabarSala = async(client, data) => {
    //console.log('sala a grabar:', data);

    const salaExiste = await Sala.findOne({ sala: data.sala })

    //console.log('sala existente', salaExiste);    

    if(!salaExiste){
        const newSala = new Sala({ sala: data.sala});
        await newSala.save();
        console.log('sala creada');
    }

    //console.log('sala ya existe')
}   


const grabarMensaje = async(client, data) => {

    data.usuario = client.userId;

    const salaExiste = await Sala.findOne({ sala: data.sala });

    salaExiste.mensajes.push(mensaje(data.nombre, data.mensaje, data.usuario));
    await salaExiste.save();
    console.log('Se grabo mensaje')
    
}


const mensaje = (nombre, mensaje, usuario) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime(),
        usuario
    };
}


module.exports = {
    grabarSala,
    grabarMensaje
}