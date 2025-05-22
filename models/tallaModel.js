'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const TallaSchema = new Schema({
    size: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] // Optional: Restrict allowed sizes
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });
module.exports = mongoose.model('Talla', TallaSchema);
