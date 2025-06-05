const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Create a new product
router.post('/', productoController.createProducto);

// Get all products
router.get('/', productoController.getAllProductos);

// Get a single product by ID
router.get('/:id', productoController.getProductoById);

// Update a product by ID
router.put('/:id', productoController.updateProducto);

// Delete a product by ID
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
