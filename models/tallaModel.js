'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const TallaSchema = new Schema({
    talla: {
    type: String,
    required: true,
    enum: ['2', '4', '6', '8', '10', '12', '14', '16', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] // Optional: Restrict allowed sizes
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });
module.exports = mongoose.model('Talla', TallaSchema);
