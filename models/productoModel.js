const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  modelo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modelo'
  },
  diseno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diseno'
  },
  tela: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tela'
  },
  cantidadTotalInventario: {
    type: Number,
    default: 0
  },
  tonalidad: {
    type: String
  },
  tallas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Talla'
  }],
  cantidadTallaSeleccionada: {
    type: Number,
    default: 0
  },
  precio: {
    type: Number,
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  },
  descripcion: {
    type: String
  },
  imagenes: [String]
});

module.exports = mongoose.model('Producto', productoSchema);
