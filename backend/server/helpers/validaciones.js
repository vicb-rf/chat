const Usuario = require('../model/usuario');

const emailExiste = async(email = '') => {

    console.log('verificando si correo existe', email)
    const existEmail = await Usuario.findOne({ email });
    if(existEmail){
        console.log(`El email ${ email }, ya esta registrado`);
        throw new Error(`El email ${ email }, ya esta registrado`);        
    }
}

const usuarioExisteId = async(id) => {

    console.log('verificando si existe usuario por id');
    const existUsuario = await Usuario.findById(id);
    if(!existUsuario){
        console.log(`El id ${ id }, no existe`);
        throw new Error(`El id ${ id }, no existe`);
    }
}

const buscarUsuario = async(email = '') => {

    console.log('Buscando usuario por email', email)
    const usuario = await Usuario.findOne({ email });
    if(!usuario){
        console.log(`El usuario ${ email }, no esta registrado`);
        throw new Error(`El usuario ${ email }, no esta registrado`);        
    }
}

module.exports = {
    emailExiste,
    usuarioExisteId,
    buscarUsuario
}