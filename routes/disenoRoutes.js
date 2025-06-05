"use strict";
const express = require("express");
const router = express.Router();
const disenoController = require("../controllers/disenoController");

// Middleware para validar los datos de entrada
router.post("/crear", disenoController.crearDiseno);
router.get("/obtener", disenoController.obtenerDisenos);
router.get("/obtener/:id", disenoController.obtenerDisenoPorId);
router.put("/actualizar/:id", disenoController.actualizarDiseno);
router.delete("/eliminar/:id", disenoController.eliminarDiseno);

module.exports = router;
