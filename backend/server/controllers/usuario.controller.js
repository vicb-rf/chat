const bcrypt = require('bcryptjs');
const Usuario = require('../model/usuario');

/********************************************************* */
const usuarioGet = async(req, res, next) =>{
    try{
        console.log('usuario get');
        const { nombre } = req.usuario;    
        const usuarios = await Usuario.find();
        
        res.json({ 
            nombre,
            usuarios });

    }
    catch(err){
        next(err);
    }

}

/********************************************************* */
const usuarioPost = async(req, res, next) =>{    

    try{
        const { nombre, email, password } = req.body;
        console.log('usuario post', nombre, email, password);
        const usuario = new Usuario({ nombre, email, password });
        
        //verificar si usuario existe
        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();
        //console.log('usuario creado');
        res.json({ msg: 'Usuario creado' });   

    }
    catch(err){
        next(err);
    }
    
}

/********************************************************* */
const usuarioDelete = async(req, res, next) =>{

    try{
        console.log('usuario delete');
        const { nombre, password, _id } = req.usuario;    
        console.log('usuario delete', password);
        const usuario = await Usuario.findOne({ _id })
        
        if(nombre !== 'administrador'){
            return res.status(400).json({
                msg: 'Debe ser Administrador'
            })
        }
       
        if(password !== usuario.password){
            return res.status(400).json({
                msg: 'Password incorrecto'
            })
        }
        const { id } = req.params;
        console.log({id});
        await Usuario.deleteOne({ _id: id });
      
        res.json({
            msg: 'Usuario eliminado'
        })

    }
    catch(err){
        next(err);
    }

}


module.exports = { 
    usuarioGet,
    usuarioPost,
    usuarioDelete
}