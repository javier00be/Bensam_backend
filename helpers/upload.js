// Ejemplo: En tu server.js o en un archivo de rutas dedicado (ej. routes/upload.js)

const express = require('express');
const router = express.Router(); // Si es un archivo de rutas, si es server.js, usa 'app' en vez de 'router'
const cloudinary = require('cloudinary').v2; // Asegúrate de que cloudinary esté configurado como arriba
const multer = require('multer');

// Configuración de Multer: Almacenar el archivo en memoria (Buffer)
// Esto evita guardar el archivo temporalmente en tu servidor antes de subirlo a Cloudinary.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta POST para subir una sola imagen
router.post('/upload-image', upload.single('image'), async (req, res) => { // 'image' es el nombre del campo del formulario
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }

    // Convertir el buffer del archivo a una cadena Base64 para subir a Cloudinary
    // Cloudinary puede aceptar buffers, pero convertirlos a Base64 es una práctica común
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'bensam_products' // Opcional: una carpeta específica en tu cuenta de Cloudinary
    });

    // Devolver la URL segura de la imagen subida
    res.json({ url: result.secure_url });

  } catch (err) {
    console.error('Error al subir imagen a Cloudinary:', err);
    res.status(500).json({ msg: 'Image upload failed.', error: err.message });
  }
});

// Si es un archivo de rutas, exporta el router:
module.exports = router;
