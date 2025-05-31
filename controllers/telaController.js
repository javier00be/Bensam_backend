const Tela = require("../models/telaModel");
const mongoose = require("mongoose");

async function crearTela(req, res) {
  try {
    let { diseno, color } = req.body;

    // Validar que diseno y color sean solo números
    if (!/^\d+$/.test(diseno) || !/^\d+$/.test(color)) {
      return res.status(400).json({ message: "Diseño y color deben contener solo números" });
    }

    // Formatear los campos
    const disenoFormateado = `D${diseno}`;
    const colorFormateado = `C${color}`;

    // Verificar si ya existe una tela con los mismos valores
    const telaExistente = await Tela.findOne({ diseno: disenoFormateado, color: colorFormateado });
    if (telaExistente) {
      return res.status(400).json({ message: "La tela ya existe" });
    }

    // Crear nueva tela
    const nuevaTela = new Tela({
      diseno: disenoFormateado,
      color: colorFormateado,
    });

    await nuevaTela.save();
    res.status(201).json({ message: "Tela creada correctamente", nuevaTela });
  } catch (error) {
    console.error("Error al crear la tela:", error);
    res.status(500).json({ message: "Error al crear la tela" });
  }
}

async function obtenerTelas(req, res) {
  try {
    const telas = await Tela.find();

    // Transform the data to combine 'diseno' and 'color'
    const telasTransformadas = telas.map(tela => {
      return {
        _id: tela._id,
        disenoColor: `${tela.diseno}-${tela.color}`, // Combined field
        createdAt: tela.createdAt,
        updatedAt: tela.updatedAt,
        __v: tela.__v,
        // Include other fields if necessary, e.g.,
        // someOtherField: tela.someOtherField
      };
    });

    res.status(200).json(telasTransformadas);
  } catch (error) {
    console.error("Error al obtener las telas:", error);
    res.status(500).json({ message: "Error al obtener las telas" });
  }
}

async function obtenerTelaPorId(req, res) {
  try {
    const { id } = req.params;
    const tela = await
        Tela.findById(id);
    if (!tela) {
        return res.status(404).json({ message: "Tela no encontrada" });
        }
    res.status(200).json(tela);
    }
    catch (error) {
        console.error("Error al obtener la tela:", error);
        res.status(500).json({ message: "Error al obtener la tela" });
    }
}

async function actualizarTela(req, res) {
  try {
    const { id } = req.params;
    const { diseno, color } = req.body;

    // Validar que diseno y color sean solo números
    if (!/^\d+$/.test(diseno) || !/^\d+$/.test(color)) {
      return res.status(400).json({ message: "Diseño y color deben contener solo números" });
    }

    // Formatear los campos
    const disenoFormateado = `D${diseno}`;
    const colorFormateado = `C${color}`;

    // Actualizar tela
    const telaActualizada = await Tela.findByIdAndUpdate(
      id,
      { diseno: disenoFormateado, color: colorFormateado },
      { new: true }
    );

    if (!telaActualizada) {
      return res.status(404).json({ message: "Tela no encontrada" });
    }

    res.status(200).json({ message: "Tela actualizada correctamente", telaActualizada });
  } catch (error) {
    console.error("Error al actualizar la tela:", error);
    res.status(500).json({ message: "Error al actualizar la tela" });
  }
}

async function eliminarTela(req, res) {
  try {
    const { id } = req.params;
    const telaEliminada = await Tela.findByIdAndDelete(id);
    if (!telaEliminada) {
      return res.status(404).json({ message: "Tela no encontrada" });
    }
    res.status(200).json({ message: "Tela eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la tela:", error);
    res.status(500).json({ message: "Error al eliminar la tela" });
  }
}




module.exports = {
  crearTela,
  obtenerTelas,
  obtenerTelaPorId,
  actualizarTela,
  eliminarTela
};
