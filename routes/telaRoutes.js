'use strict';
const express = require('express');
const router = express.Router();
const telaController = require('../controllers/telaController');

// Middleware para validar los datos de entrada
router.post('/crear', telaController.crearTela);
router.get('/listar', telaController.obtenerTelas);
router.get('/listar/:id', telaController.obtenerTelaPorId);
router.put('/actualizar/:id', telaController.actualizarTela);
router.delete('/eliminar/:id', telaController.eliminarTela);

module.exports = router;






