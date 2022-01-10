const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/generarjwt');

const login = async(req, res) => {

    const { email, password } = req.body;
    //console.log("email y password", email);

    try{

        //verificar si email existe
        const usuario = await Usuario.findOne({ email });

        //verificar el password
        const validarPassword = bcrypt.compareSync(password, usuario.password); //compara el password enviado con el de la db y deveulve un true o false
        if(!validarPassword){
            return res.status(400).json({msg: 'Password incorrecto' })
        }
        //generar jwt
        const token = await generarJWT (usuario.id);
        res.json({
            nombre: usuario.nombre,
            token
        })
    }
    catch(err){
        console.log(error);
        return res.status(500).json({
            msg: "Internal errror"
        })
    }
}

module.exports = login