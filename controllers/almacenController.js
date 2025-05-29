const Almacen = require('../models/almacenModel');

// Create a new Almacen
async function createAlmacen (req, res) {
  try {
    const newAlmacen = new Almacen(req.body);
    const savedAlmacen = await newAlmacen.save();
    res.status(201).json(savedAlmacen);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
