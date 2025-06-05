const express = require("express");
const categoriaController = require("../controllers/categoriaController");

const router = express.Router();

router.post("/crear", categoriaController.crearCategoria);
router.get("/obtener", categoriaController.obtenerCategorias);
router.get("/obtener/:id", categoriaController.obtenerCategoriaPorId);
router.put("/actualizar/:id", categoriaController.actualizarCategoria);
router.delete("/eliminar/:id", categoriaController.eliminarCategoria);

module.exports = router;
