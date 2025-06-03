const Categoria = require('../models/categoriaModel');

// Crear una nueva categoría
async function crearCategoria(req, res) {
  try {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.status(201).json({ message: 'Categoría creada correctamente', categoria });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error });
  }
}

// Obtener todas las categorías
async function obtenerCategorias(req, res) {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error });
  }
}

// Obtener una categoría por ID
async function obtenerCategoriaPorId(req, res) {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error });
  }
}

// Actualizar una categoría por ID
async function actualizarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría actualizada correctamente', categoria });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error });
  }
}

// Eliminar una categoría por ID
async function eliminarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
};
