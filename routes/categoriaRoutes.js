const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
