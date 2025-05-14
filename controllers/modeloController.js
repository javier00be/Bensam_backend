const Modelo = require('../models/modeloModel');
const mongoose = require('mongoose');

async function crearModelo(req, res) {
    try {
        const { nombre } = req.body;

        // Validar si el modelo ya existe
        const modeloExistente = await Modelo.findOne({ nombre });
        if (modeloExistente) {
            return res.status(400).json({ message: "El modelo ya existe" });
        }

        // Crear nuevo modelo
        const nuevoModelo = new Modelo({
            nombre,
        });
        await nuevoModelo.save();
        res.status(201).json({ message: "Modelo creado correctamente", nuevoModelo });
    } catch (error) {
        console.error("Error al crear el modelo:", error);
        res.status(500).json({ message: "Error al crear el modelo" });
    }
}

module.exports = {
    crearModelo,
};
