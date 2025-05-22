// Current strict mode is probably handled by Mongoose itself, no need for 'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Or use const { Schema } = mongoose;

// Missing: TallaSchema definition
// This is crucial because `tallas: [tallaSchema]` refers to it.
// Assuming it should look like this:
const tallaSchema = new Schema({
    size: {
        type: String,
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] // Recommended to constrain possible values
    },
    quantity: {
        type: Number,
        required: true,
        min: 0 // Quantity cannot be negative
    }
}, { _id: false }); // Prevents creating an _id for each subdocument

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
        type: [tallaSchema], // Correctly referencing the subdocument schema
        default: []
    },
    activo: {
        type: Boolean,
        default: true
    },
    ultimaActualizacion: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // This automatically adds createdAt and updatedAt

// You have `timestamps: true`, which adds createdAt and updatedAt.
// So, `ultimaActualizacion` might be redundant unless you want a different timestamp.
// If you keep `ultimaActualizacion` AND `timestamps: true`, you'll have three date fields.
// createdAt, updatedAt, ultimaActualizacion. Usually, `updatedAt` is sufficient.
// If `ultimaActualizacion` is for a different purpose, then keep it.

module.exports = mongoose.model('Almacen', AlmacenSchema);
