// controllers/mascotasController.js
const Mascota = require('../models/mascotasMdl');

// Controlador para obtener todas las mascotas
exports.getAll = (req, res) => {
    Mascota.getAll((err, mascotas) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(mascotas);
    });
};

// Controlador para obtener una mascota por su ID
exports.getById = (req, res) => {
    const { id } = req.params;
    Mascota.getById(id, (err, mascota) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json(mascota);
    });
};

// Controlador para crear una nueva mascota
exports.create = (req, res) => {
    const { nombreMascota, pesoMascota, idUsuario } = req.body;
    Mascota.create(nombreMascota, pesoMascota, idUsuario, (err, nuevaMascota) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(nuevaMascota);
    });
};

// Controlador para actualizar una mascota por su ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { nombreMascota, pesoMascota, idUsuario } = req.body;
    Mascota.update(id, nombreMascota, pesoMascota, idUsuario, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Mascota actualizada correctamente' });
    });
};

// Controlador para eliminar una mascota por su ID
exports.delete = (req, res) => {
    const { id } = req.params;
    Mascota.delete(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Mascota eliminada correctamente' });
    });
};
