'use strict';
const express = require('express');
const router = express.Router();
const almacenController = require('../controllers/almacenController');

// Create a new Almacen
router.post('/crear', almacenController.createAlmacen);

// Get all Almacenes
router.get('/obtener', almacenController.getAllAlmacenes);

// Get a single Almacen by ID
router.get('/obtener/:id', almacenController.getAlmacenById);

// Update an Almacen by ID
router.put('/actualizar/:id', almacenController.updateAlmacen);

// Delete an Almacen by ID
router.delete('/eliminar/:id', almacenController.deleteAlmacen);

module.exports = router;
