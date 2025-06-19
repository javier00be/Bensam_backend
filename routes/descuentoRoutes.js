const express = require('express');
const descuentoController = require('../controllers/descuentoController');

const router = express.Router();

// Rutas para los descuentos
router.post('/', descuentoController.crearDescuento);
router.get('/', descuentoController.obtenerDescuentos);
router.get('/:id', descuentoController.obtenerDescuentoPorId);
router.put('/:id', descuentoController.actualizarDescuento);
router.delete('/:id', descuentoController.eliminarDescuento);

module.exports = router;
