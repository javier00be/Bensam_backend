const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.post('/crear', categoriaController.crearCategoria);
router.get('/listar', categoriaController.obtenerCategorias);
router.get('/listar/:id', categoriaController.obtenerCategoriaPorId);
router.put('/actualizar/:id', categoriaController.actualizarCategoria);
router.delete('/eliminar/:id', categoriaController.eliminarCategoria);

module.exports = router;
