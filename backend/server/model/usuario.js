const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        requerid: true
    },
    email: {
        type: String,
        requerid: true
    },
    password: {
        type: String,
        requerid: true
    },
    created: {
        type: Date,
        default: new Date()
    }
        
});

usuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);