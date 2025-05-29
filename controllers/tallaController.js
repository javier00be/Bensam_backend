const Talla = require('../models/tallaModel');

// Create a new Talla
async function createTalla (req, res) {
  try {
    const newTalla = new Talla(req.body);
    const savedTalla = await newTalla.save();
    res.status(201).json(savedTalla);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Tallas
async function getAllTallas (req, res) {
  try {
    const tallas = await Talla.find();
    res.status(200).json(tallas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Talla by ID
async function getTallaById (req, res) {
  try {
    const talla = await Talla.findById(req.params.id);
    if (!talla) {
      return res.status(404).json({ message: 'Talla not found' });
    }
    res.status(200).json(talla);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Talla by ID
async function updateTalla (req, res) {
  try {
    const updatedTalla = await Talla.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTalla) {
      return res.status(404).json({ message: 'Talla not found' });
    }
    res.status(200).json(updatedTalla);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Talla by ID
async function deleteTalla (req, res) {
  try {
    const deletedTalla = await Talla.findByIdAndDelete(req.params.id);
    if (!deletedTalla) {
      return res.status(404).json({ message: 'Talla not found' });
    }
    res.status(200).json({ message: 'Talla deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTalla,
  getAllTallas,
  getTallaById,
  updateTalla,
  deleteTalla
};
