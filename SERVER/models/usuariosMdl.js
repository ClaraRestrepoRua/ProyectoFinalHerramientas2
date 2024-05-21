// modelos/usuariosMdl.js
const connection = require('../database');

class Usuario {
    constructor(idUsuario, nombreUsuario, apellidoUsuario, telefonoUsuario) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.telefonoUsuario = telefonoUsuario;
    }

    // Método para obtener todos los usuarios
    static getAll(callback) {
        connection.query('SELECT * FROM usuarios', (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const usuarios = results.map(row => new Usuario(row.idUsuario, row.nombreUsuario, row.apellidoUsuario, row.telefonoUsuario));
            callback(null, usuarios);
        });
    }

    // Método para obtener un usuario por su ID
    static getById(id, callback) {
        connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Usuario no encontrado'), null);
                return;
            }
            const usuario = new Usuario(results[0].idUsuario, results[0].nombreUsuario, results[0].apellidoUsuario, results[0].telefonoUsuario);
            callback(null, usuario);
        });
    }

    // Método para crear un nuevo usuario
    static create(nombreUsuario, apellidoUsuario, telefonoUsuario, callback) {
        connection.query('INSERT INTO usuarios (nombreUsuario, apellidoUsuario, telefonoUsuario) VALUES (?, ?, ?)', [nombreUsuario, apellidoUsuario, telefonoUsuario], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const nuevoUsuario = new Usuario(results.insertId, nombreUsuario, apellidoUsuario, telefonoUsuario);
            callback(null, nuevoUsuario);
        });
    }

    // Método para actualizar un usuario por su ID
    static update(id, nombreUsuario, apellidoUsuario, telefonoUsuario, callback) {
        connection.query('UPDATE usuarios SET nombreUsuario = ?, apellidoUsuario = ?, telefonoUsuario = ? WHERE idUsuario = ?', [nombreUsuario, apellidoUsuario, telefonoUsuario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    // Método para eliminar un usuario por su ID
    static delete(id, callback) {
        connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Usuario;
