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

async function obtenerModelos(req, res) {
    try {
        const modelos = await Modelo.find();
        res.status(200).json(modelos);
    } catch (error) {
        console.error("Error al obtener los modelos:", error);
        res.status(500).json({ message: "Error al obtener los modelos" });
    }
}

async function obtenerModeloPorId(req, res) {
    try {
        const { id } = req.params;
        const modelo = await Modelo.findById(id);
        if (!modelo) {
            return res.status(404).json({ message: "Modelo no encontrado" });
        }
        res.status(200).json(modelo);
    }
    catch (error) {
        console.error("Error al obtener el modelo:", error);
        res.status(500).json({ message: "Error al obtener el modelo" });
    }
}

async function actualizarModelo(req, res) {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        // Validar si el modelo ya existe
        const modeloExistente = await Modelo.findOne({ nombre });
        if (modeloExistente) {
            return res.status(400).json({ message: "El modelo ya existe" });
        }

        // Actualizar modelo
        const modeloActualizado = await Modelo.findByIdAndUpdate(id, { nombre }, { new: true });
        if (!modeloActualizado) {
            return res.status(404).json({ message: "Modelo no encontrado" });
        }
        res.status(200).json({ message: "Modelo actualizado correctamente", modeloActualizado });
    } catch (error) {
        console.error("Error al actualizar el modelo:", error);
        res.status(500).json({ message: "Error al actualizar el modelo" });
    }
}

async function eliminarModelo(req, res) {
    try {
        const { id } = req.params;
        const modeloEliminado = await Modelo.findByIdAndDelete(id);
        if (!modeloEliminado) {
            return res.status(404).json({ message: "Modelo no encontrado" });
        }
        res.status(200).json({ message: "Modelo eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el modelo:", error);
        res.status(500).json({ message: "Error al eliminar el modelo" });
    }
}

module.exports = {
    crearModelo,
    obtenerModelos,
    obtenerModeloPorId,
    actualizarModelo,
    eliminarModelo
};
