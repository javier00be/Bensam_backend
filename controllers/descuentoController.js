const Descuento = require('../models/descuentoModel');

// Crear un nuevo descuento
exports.crearDescuento = async (req, res) => {
  try {
    const descuento = new Descuento(req.body);
    await descuento.save();
    res.status(201).json({ mensaje: 'Descuento creado con éxito', descuento });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el descuento', error });
  }
};

// Obtener todos los descuentos
exports.obtenerDescuentos = async (req, res) => {
  try {
    const descuentos = await Descuento.find();
    res.status(200).json(descuentos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los descuentos', error });
  }
};

// Obtener un descuento por ID
exports.obtenerDescuentoPorId = async (req, res) => {
  try {
    const descuento = await Descuento.findById(req.params.id);
    if (!descuento) {
      return res.status(404).json({ mensaje: 'Descuento no encontrado' });
    }
    res.status(200).json(descuento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el descuento', error });
  }
};

// Actualizar un descuento
exports.actualizarDescuento = async (req, res) => {
  try {
    const descuento = await Descuento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!descuento) {
      return res.status(404).json({ mensaje: 'Descuento no encontrado' });
    }
    res.status(200).json({ mensaje: 'Descuento actualizado con éxito', descuento });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el descuento', error });
  }
};

// Eliminar un descuento
exports.eliminarDescuento = async (req, res) => {
  try {
    const descuento = await Descuento.findByIdAndDelete(req.params.id);
    if (!descuento) {
      return res.status(404).json({ mensaje: 'Descuento no encontrado' });
    }
    res.status(200).json({ mensaje: 'Descuento eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el descuento', error });
  }
};
