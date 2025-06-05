const Producto = require('../models/productoModel');

// Create a new product
async function createProducto(req, res) {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
async function getAllProductos(req, res) {
  try {
    const productos = await Producto.find().populate('modelo diseno tela categoria');
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
async function getProductoById(req, res) {
  try {
    const producto = await Producto.findById(req.params.id).populate('modelo diseno tela categoria');
    if (!producto) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product by ID
async function updateProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('modelo diseno tela categoria');
    if (!producto) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(producto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product by ID
async function deleteProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto
};
