// controllers/veterinariosController.js
const Veterinario = require('../models/veterinariosMdl');

// Controlador para obtener todos los veterinarios
exports.getAll = (req, res) => {
    Veterinario.getAll((err, veterinarios) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(veterinarios);
    });
};

// Controlador para obtener un veterinario por su ID
exports.getById = (req, res) => {
    const { id } = req.params;
    Veterinario.getById(id, (err, veterinario) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json(veterinario);
    });
};

// Controlador para crear un nuevo veterinario
exports.create = (req, res) => {
    const { nombreVeterinario, apellidoVeterinario, telefonoVeterinario } = req.body;
    Veterinario.create(nombreVeterinario, apellidoVeterinario, telefonoVeterinario, (err, nuevoVeterinario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(nuevoVeterinario);
        Veterinario.getAll((err, veterinarios) => {
            if (err) {
                console.error('Error al obtener veterinarios:', err);
                return;
            }
            Veterinario.updateVeterinariosFile(veterinarios);
        });
    });
};

// Controlador para actualizar un veterinario por su ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { nombreVeterinario, apellidoVeterinario, telefonoVeterinario } = req.body;
    Veterinario.update(id, nombreVeterinario, apellidoVeterinario, telefonoVeterinario, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Veterinario actualizado correctamente' });
        Veterinario.getAll((err, veterinarios) => {
            if (err) {
                console.error('Error al obtener veterinarios:', err);
                return;
            }
            Veterinario.updateVeterinariosFile(veterinarios);
        });
    });
};

// Controlador para eliminar un veterinario por su ID
exports.delete = (req, res) => {
    const { id } = req.params;
    Veterinario.delete(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Veterinario eliminado correctamente' });
        Veterinario.getAll((err, veterinarios) => {
            if (err) {
                console.error('Error al obtener veterinarios:', err);
                return;
            }
            Veterinario.updateVeterinariosFile(veterinarios);
        });
    });
};
