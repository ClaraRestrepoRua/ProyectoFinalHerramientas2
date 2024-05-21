// server/server.js
const express = require('express');
const app = express();
const cors = require('cors');

// Importar controladores
const usuariosController = require('./controllers/usuariosCtrl');
const veterinariosController = require('./controllers/veterinariosCtrl');
const mascotasController = require('./controllers/mascotasCtrl');
const historiaClinicaController = require('./controllers/historiaClinicaCtrl');
const citasController = require('./controllers/citasCtrl');

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de citas
app.get('/api/citas', citasController.getAll);
app.get('/api/citas/:id', citasController.getById);
app.post('/api/citas', citasController.create);
app.put('/api/citas/:id', citasController.update);
app.delete('/api/citas/:id', citasController.delete);

// Rutas de usuarios
app.get('/api/usuarios', usuariosController.getAll);
app.get('/api/usuarios/:id', usuariosController.getById);
app.post('/api/usuarios', usuariosController.create);
app.put('/api/usuarios/:id', usuariosController.update);
app.delete('/api/usuarios/:id', usuariosController.delete);

// Rutas de veterinarios
app.get('/api/veterinarios', veterinariosController.getAll);
app.get('/api/veterinarios/:id', veterinariosController.getById);
app.post('/api/veterinarios', veterinariosController.create);
app.put('/api/veterinarios/:id', veterinariosController.update);
app.delete('/api/veterinarios/:id', veterinariosController.delete);

// Rutas de mascotas
app.get('/api/mascotas', mascotasController.getAll);
app.get('/api/mascotas/:id', mascotasController.getById);
app.post('/api/mascotas', mascotasController.create);
app.put('/api/mascotas/:id', mascotasController.update);
app.delete('/api/mascotas/:id', mascotasController.delete);

// Rutas de historias clínicas
app.get('/api/historias_clinicas', historiaClinicaController.getAll);
app.get('/api/historias_clinicas/:id', historiaClinicaController.getById);
app.post('/api/historias_clinicas', historiaClinicaController.create);
app.put('/api/historias_clinicas/:id', historiaClinicaController.update);
app.delete('/api/historias_clinicas/:id', historiaClinicaController.delete);

// Ruta de prueba para verificar la conexión
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Proyecto Mascotas');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
