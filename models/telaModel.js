'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const TelaSchema = new Schema({
    diseno:{
        type: String,
        require:true,
    },
    color:{
        type: String,
        require:true,
    },
}, { timestamps: true });
module.exports = mongoose.model('Tela', TelaSchema);
