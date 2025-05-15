'use strict';
const express = require('express');
const router = express.Router();
const disenoController = require('../controllers/disenoController');

// Middleware para validar los datos de entrada
router.post('/crear', disenoController.crearDiseno);
router.get('/listar', disenoController.obtenerDisenos);
router.get('/listar/:id', disenoController.obtenerDisenoPorId);
router.put('/actualizar/:id', disenoController.actualizarDiseno);
router.delete('/eliminar/:id', disenoController.eliminarDiseno);

module.exports = router;





