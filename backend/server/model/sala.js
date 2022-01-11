const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({            
    sala: {
        type: String,
        requerid: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    // usuarios: [{ 
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Usuario'
    // }], 
    mensajes: [{ 
        nombre: String,     
        mensaje: String,
        date: Date,
        usuario: { 
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario'
        }
    }]
});

const Sala = mongoose.model('Sala', salaSchema);

module.exports = Sala