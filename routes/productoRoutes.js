const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Create a new product
router.post('/crear', productoController.crearProducto);

// Get all products
router.get('/obtener', productoController.obtenerTodosProductos);

// Get a single product by ID
router.get('/obtener/:id', productoController.obtenerProductoPorId);

// Update a product by ID
router.put('/actualizar/:id', productoController.actualizarProducto);

// Delete a product by ID
router.delete('/eliminar/:id', productoController.eliminarProducto);

module.exports = router;
