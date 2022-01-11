const jwt = require('jsonwebtoken');

const Usuario = require('../model/usuario')

const validarJWT = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msq: 'No token'
        })
    }

    try {
        //del token extraemos el uid
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //obtener el usuario al que corresponde el token
        const usuario = await Usuario.findById(uid);        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en db'
            })
        }

        console.log('token ok');
        req.usuario = usuario;  //creamos la propiedad usuario y se la pasamos al siguiente controlador
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = validarJWT