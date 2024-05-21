// controllers/usuariosController.js
const Usuario = require('../models/usuariosMdl');

// Controlador para obtener todos los usuarios
exports.getAll = (req, res) => {
    Usuario.getAll((err, usuarios) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(usuarios);
    });
};

// Controlador para obtener un usuario por su ID
exports.getById = (req, res) => {
    const { id } = req.params;
    Usuario.getById(id, (err, usuario) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json(usuario);
    });
};

// Controlador para crear un nuevo usuario
exports.create = (req, res) => {
    const { nombreUsuario, apellidoUsuario, telefonoUsuario } = req.body;
    Usuario.create(nombreUsuario, apellidoUsuario, telefonoUsuario, (err, nuevoUsuario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(nuevoUsuario);
    });
};

// Controlador para actualizar un usuario por su ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, apellidoUsuario, telefonoUsuario } = req.body;
    Usuario.update(id, nombreUsuario, apellidoUsuario, telefonoUsuario, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    });
};

// Controlador para eliminar un usuario por su ID
exports.delete = (req, res) => {
    const { id } = req.params;
    Usuario.delete(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    });
};
