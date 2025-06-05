"use strict";
const express = require("express");
const router = express.Router();
const modeloController = require("../controllers/modeloController");

// Middleware para validar los datos de entrada
router.post("/crear", modeloController.crearModelo);
router.get("/obtener", modeloController.obtenerModelos);
router.get("/obtener/:id", modeloController.obtenerModeloPorId);
router.put("/actualizar/:id", modeloController.actualizarModelo);
router.delete("/eliminar/:id", modeloController.eliminarModelo);

module.exports = router;
