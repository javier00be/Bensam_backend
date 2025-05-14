'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const ModeloSchema = new Schema({
    nombre:{
        type: String,
        require:true,
    }
}, { timestamps: true });
module.exports = mongoose.model('Modelo', ModeloSchema);
