const Almacen = require('../models/almacenModel');

// Create a new Almacen
async function createAlmacen (req, res) {
  console.log('--- Inicio de la función createAlmacen ---');
  console.log('Cuerpo de la solicitud (req.body):', req.body); // Para ver los datos que llegan del frontend

  try {
    // Verificar si el cuerpo de la solicitud está vacío o es inválido antes de crear el objeto
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('Error: El cuerpo de la solicitud está vacío o es inválido.');
      return res.status(400).json({ message: 'El cuerpo de la solicitud no puede estar vacío.' });
    }

    console.log('Creando nueva instancia de Almacen con:', req.body);
    const newAlmacen = new Almacen(req.body);

    console.log('Intentando guardar el nuevo Almacen en la base de datos...');
    const savedAlmacen = await newAlmacen.save();
    console.log('Almacen guardado exitosamente:', savedAlmacen); // Para ver el objeto guardado

    res.status(201).json(savedAlmacen);
    console.log('Respuesta 201 enviada al frontend.');

  } catch (err) {
    console.error('--- ERROR en createAlmacen ---');
    console.error('Mensaje de error:', err.message); // Mensaje legible del error
    console.error('Detalles completos del error:', err); // Objeto de error completo para depuración
    // Si el error es de validación (por ejemplo, Mongoose), puedes intentar dar más detalles
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message);
      res.status(400).json({ message: 'Error de validación', errors: errors });
      console.log('Respuesta 400 (Error de validación) enviada al frontend.');
    } else {
      res.status(500).json({ message: err.message || 'Error interno del servidor.' });
      console.log('Respuesta 500 (Error interno del servidor) enviada al frontend.');
    }
  } finally {
    console.log('--- Fin de la ejecución de createAlmacen ---');
  }
};
// Get all Almacenes
async function getAllAlmacenes (req, res) {
  try {
    const almacenes = await Almacen.find();
    res.status(200).json(almacenes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Almacen by ID
async function getAlmacenById (req, res) {
  try {
    const almacen = await Almacen.findById(req.params.id);
    if (!almacen) {
      return res.status(404).json({ message: 'Almacen not found' });
    }
    res.status(200).json(almacen);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an Almacen by ID
async function updateAlmacen (req, res) {
  try {
    const updatedAlmacen = await Almacen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAlmacen) {
      return res.status(404).json({ message: 'Almacen not found' });
    }
    res.status(200).json(updatedAlmacen);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an Almacen by ID
async function deleteAlmacen (req, res) {
  try {
    const deletedAlmacen = await Almacen.findByIdAndDelete(req.params.id);
    if (!deletedAlmacen) {
      return res.status(404).json({ message: 'Almacen not found' });
    }
    res.status(200).json({ message: 'Almacen deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAlmacen,
  getAllAlmacenes,
  getAlmacenById,
  updateAlmacen,
  deleteAlmacen
};
