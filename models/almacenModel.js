// Current strict mode is probably handled by Mongoose itself, no need for 'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Or use const { Schema } = mongoose;
const TallaSchema = require('./tallaModel').schema;

const AlmacenSchema = new Schema({
    modelo: {
        type: String,
        required: true,
        trim: true
    },
    diseno: {
        type: String,
        required: true,
        trim: true
    },
    tela: {
        type: String,
        required: true,
        trim: true
    },
    fechaEntrada: {
        type: Date,
        default: Date.now
    },
    tallas: {
        type: [TallaSchema], // Correctly referencing the subdocument schema
        default: []
    },
    ultimaActualizacion: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // This automatically adds createdAt and updatedAt


module.exports = mongoose.model('Almacen', AlmacenSchema);
