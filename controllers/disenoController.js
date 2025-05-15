const Diseno = require('../models/disenoModel');
const mongoose = require('mongoose');

async function crearDiseno(req, res) {
    try {
        const { nombre } = req.body;

        // Validar si el diseño ya existe
        const disenoExistente = await Diseno.findOne({ nombre });
        if (disenoExistente) {
            return res.status(400).json({ message: "El diseño ya existe" });
        }

        // Crear nuevo diseño
        const nuevoDiseno = new Diseno({
            nombre,
        });
        await nuevoDiseno.save();
        res.status(201).json({ message: "Diseño creado correctamente", nuevoDiseno });
    } catch (error) {
        console.error("Error al crear el diseño:", error);
        res.status(500).json({ message: "Error al crear el diseño" });
    }
}

async function obtenerDisenos(req, res) {
    try {
        const disenos = await Diseno.find();
        res.status(200).json(disenos);
    } catch (error) {
        console.error("Error al obtener los diseños:", error);
        res.status(500).json({ message: "Error al obtener los diseños" });
    }
}

async function obtenerDisenoPorId(req, res) {
    try {
        const { id } = req.params;
        const diseno = await Diseno.findById(id);
        if (!diseno) {
            return res.status(404).json({ message: "Diseño no encontrado" });
        }
        res.status(200).json(diseno);
    } catch (error) {
        console.error("Error al obtener el diseño:", error);
        res.status(500).json({ message: "Error al obtener el diseño" });
    }
}

async function actualizarDiseno(req, res) {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        // Validar si el diseño ya existe
        const disenoExistente = await Diseno.findOne({ nombre });
        if (disenoExistente) {
            return res.status(400).json({ message: "El diseño ya existe" });
        }

        // Actualizar diseño
        const disenoActualizado = await Diseno.findByIdAndUpdate(id, { nombre }, { new: true });
        if (!disenoActualizado) {
            return res.status(404).json({ message: "Diseño no encontrado" });
        }
        res.status(200).json({ message: "Diseño actualizado correctamente", disenoActualizado });
    } catch (error) {
        console.error("Error al actualizar el diseño:", error);
        res.status(500).json({ message: "Error al actualizar el diseño" });
    }
}

async function eliminarDiseno(req, res) {
    try {
        const { id } = req.params;

        // Eliminar diseño
        const disenoEliminado = await Diseno.findByIdAndDelete(id);
        if (!disenoEliminado) {
            return res.status(404).json({ message: "Diseño no encontrado" });
        }
        res.status(200).json({ message: "Diseño eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el diseño:", error);
        res.status(500).json({ message: "Error al eliminar el diseño" });
    }
}


module.exports ={
    crearDiseno,
    obtenerDisenos,
    obtenerDisenoPorId,
    actualizarDiseno,
    eliminarDiseno
}
