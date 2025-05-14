const mongoose = require("mongoose");
const Usuario = require("../models/usuarioModel");

async function crearUsuario(req, res) {
  try {
    const { nombre, apellidos, email, password, tipo_usuario } = req.body;

    // Validar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellidos,
      email,
      password,
      tipo_usuario,
    });
    await nuevoUsuario.save();
    res
      .status(201)
      .json({ message: "Usuario creado correctamente", nuevoUsuario });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
}
