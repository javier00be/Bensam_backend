"use strict";
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require('./db');
const app = express();

const modeloRoutes = require('./routes/modeloRoutes');
const disenoRoutes = require('./routes/disenoRoutes');
const telaRoutes = require('./routes/telaRoutes');

// Configuración de middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

// Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ message: 'API REST funcionando correctamente' });
});

app.use('/api/modelo', modeloRoutes);
app.use('/api/diseno', disenoRoutes);
app.use('/api/tela', telaRoutes);




const port = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Servidor corriendo en puerto: " + port);
    });
}).catch((err) => {
    console.error("Fallo al iniciar el servidor debido a la base de datos:", err);
});

module.exports = app;
