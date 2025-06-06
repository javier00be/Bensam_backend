const Producto = require('../models/productoModel');
const cloudinary = require('cloudinary').v2;

// Crear un nuevo producto con imagen
async function crearProducto(req, res) {
  try {
    let imageUrl = null;
    
    // Si hay un archivo de imagen, subirlo a Cloudinary
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'bensam_products'
      });
      
      imageUrl = result.secure_url;
    }
    
    // Crear el objeto del producto incluyendo la URL de la imagen
    const productoData = {
      ...req.body,
      imagen: imageUrl // Asegúrate de que tu modelo tenga un campo 'imagen'
    };
    
    const producto = new Producto(productoData);
    await producto.save();
    
    res.status(201).json(producto);
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(400).json({ message: err.message });
  }
}

// Actualizar un producto con posible nueva imagen
async function actualizarProducto(req, res) {
  try {
    let updateData = { ...req.body };
    
    // Si hay un archivo de imagen, subirlo a Cloudinary
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'bensam_products'
      });
      
      updateData.imagen = result.secure_url;
    }
    
    const producto = await Producto.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    ).populate('modelo diseno tela categoria');
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json(producto);
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(400).json({ message: err.message });
  }
}

// Obtener todos los productos
async function obtenerTodosProductos(req, res) {
  try {
    const productos = await Producto.find().populate('modelo diseno tela categoria');
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Obtener un solo producto por ID
async function obtenerProductoPorId(req, res) {
  try {
    const producto = await Producto.findById(req.params.id).populate('modelo diseno tela categoria');
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Eliminar un producto por ID
async function eliminarProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  crearProducto,
  obtenerTodosProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
};
