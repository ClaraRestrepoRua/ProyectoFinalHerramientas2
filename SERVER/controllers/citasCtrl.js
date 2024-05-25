// controllers/citasCtrl.js
const Cita = require('../models/citasMdl');

// Controlador para obtener todas las citas
exports.getAll = (req, res) => {
    Cita.getAll((err, citas) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(citas);
    });
};

// Controlador para obtener una cita por su ID
exports.getById = (req, res) => {
    const { id } = req.params;
    Cita.getById(id, (err, cita) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json(cita);
    });
};

// Controlador para crear una nueva cita
exports.create = (req, res) => {
    const { fechaCita, idUsuario, idMascota, idVeterinario } = req.body;
    Cita.create(fechaCita, idUsuario, idMascota, idVeterinario, (err, nuevaCita) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(nuevaCita);
        Cita.getAll((err, citas) => {
            if (err) {
                console.error('Error al obtener citas:', err);
                return;
            }
            Cita.updateCitasFile(citas);
        });
    });
};

// Controlador para actualizar una cita por su ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { fechaCita, idUsuario, idMascota, idVeterinario } = req.body;
    Cita.update(id, fechaCita, idUsuario, idMascota, idVeterinario, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Cita actualizada correctamente' });
        Cita.getAll((err, citas) => {
            if (err) {
                console.error('Error al obtener citas:', err);
                return;
            }
            Cita.updateCitasFile(citas);
        });
    });
};

// Controlador para eliminar una cita por su ID
exports.delete = (req, res) => {
    const { id } = req.params;
    Cita.delete(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Cita eliminada correctamente' });
        Cita.getAll((err, citas) => {
            if (err) {
                console.error('Error al obtener citas:', err);
                return;
            }
            Cita.updateCitasFile(citas);
        });
    });
};
