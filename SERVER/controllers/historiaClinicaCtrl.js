// controllers/historiaClinicaCtrl.js
const HistoriaClinica = require('../models/historiaClinicaMdl');

// Controlador para obtener todas las historias clínicas
exports.getAll = (req, res) => {
    HistoriaClinica.getAll((err, historiasClinicas) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(historiasClinicas);
    });
};

// Controlador para obtener una historia clínica por su ID
exports.getById = (req, res) => {
    const { id } = req.params;
    HistoriaClinica.getById(id, (err, historiaClinica) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json(historiaClinica);
    });
};

// Controlador para crear una nueva historia clínica
exports.create = (req, res) => {
    const { descripcionClinica, medicamento, idMascota, idVeterinario } = req.body;
    HistoriaClinica.create(descripcionClinica, medicamento, idMascota, idVeterinario, (err, nuevaHistoriaClinica) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(nuevaHistoriaClinica);
        HistoriaClinica.getAll((err, historiasClinicas) => {
            if (err) {
                console.error('Error al obtener historias clínicas:', err);
                return;
            }
            HistoriaClinica.updateHistoriasClinicasFile(historiasClinicas);
        });
    });
};

// Controlador para actualizar una historia clínica por su ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { descripcionClinica, medicamento, idMascota, idVeterinario } = req.body;
    HistoriaClinica.update(id, descripcionClinica, medicamento, idMascota, idVeterinario, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Historia clínica actualizada correctamente' });
        HistoriaClinica.getAll((err, historiasClinicas) => {
            if (err) {
                console.error('Error al obtener historias clínicas:', err);
                return;
            }
            HistoriaClinica.updateHistoriasClinicasFile(historiasClinicas);
        });
    });
};

// Controlador para eliminar una historia clínica por su ID
exports.delete = (req, res) => {
    const { id } = req.params;
    HistoriaClinica.delete(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Historia clínica eliminada correctamente' });
        HistoriaClinica.getAll((err, historiasClinicas) => {
            if (err) {
                console.error('Error al obtener historias clínicas:', err);
                return;
            }
            HistoriaClinica.updateHistoriasClinicasFile(historiasClinicas);
        });
    });
};
