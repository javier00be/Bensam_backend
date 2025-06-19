const mongoose = require('mongoose');

const descuentoSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
    },
    porcentaje: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Descuento', descuentoSchema);
