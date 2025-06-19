const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modelo',
    required: true
  },
  diseno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diseno',
    required: true
  },
  tela: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tela',
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  tonalidad: { // New field added here
    type: String,
    required: false, // Set to true if this field is always mandatory
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  cantidadInventario: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  tallas: [{
    talla: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  imagenes: [{
    type: String // Array de URLs si quieres múltiples imágenes
  }],
  activo: {
    type: Boolean,
    default: true
  },
  Comentario: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    valor: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    }
  }]
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Producto', productoSchema);
