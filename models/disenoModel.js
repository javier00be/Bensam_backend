'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const DisenoSchema = new Schema({
    nombre:{
        type: String,
        require:true,
    }
}, { timestamps: true });
module.exports = mongoose.model('Diseno', DisenoSchema);
