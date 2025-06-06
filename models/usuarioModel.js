'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Cambia tipo usuario de acuerdo sea (admin o usuario)
let UsuarioSchema = new Schema({
    documento_identidad:
    {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tipo_usuario: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);
