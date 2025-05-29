'use strict';
const express = require('express');
const router = express.Router();
const tallaController = require('../controllers/tallaController');

// Create a new Talla
router.post('/crear', tallaController.createTalla);

// Get all Tallas
router.get('/obtener', tallaController.getAllTallas);

// Get a single Talla by ID
router.get('/obtener/:id', tallaController.getTallaById);

// Update a Talla by ID
router.put('/actualizar/:id', tallaController.updateTalla);

// Delete a Talla by ID
router.delete('/eliminar/:id', tallaController.deleteTalla);

module.exports = router;
