// modelos/mascotasMdl.js
const connection = require('../database');

const Usuario = require('./usuariosMdl');

class Mascota {
    constructor(idMascota, nombreMascota, pesoMascota, idUsuario, usuario = null) {
        this.idMascota = idMascota;
        this.nombreMascota = nombreMascota;
        this.pesoMascota = pesoMascota;
        this.idUsuario = idUsuario;
        this.usuario = usuario;
    }

    // Método para obtener todas las mascotas
    static getAll(callback) {
        const query = `
            SELECT *
            FROM mascotas 
            INNER JOIN usuarios ON mascotas.idUsuario = usuarios.idUsuario;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const mascotas = results.map(row => {
                const usuario = new Usuario(row.idUsuario, row.nombreUsuario, row.apellidoUsuario, row.telefonoUsuario);
                return new Mascota(row.idMascota, row.nombreMascota, row.pesoMascota, row.idUsuario, usuario);
            });
            callback(null, mascotas);
        });
    }

    // Método para obtener una mascota por su ID
    static getById(id, callback) {
        const query = `
            SELECT mascotas.*, usuarios.idUsuario, usuarios.nombreUsuario, usuarios.apellidoUsuario, usuarios.telefonoUsuario
            FROM mascotas 
            INNER JOIN usuarios ON mascotas.idUsuario = usuarios.idUsuario
            WHERE mascotas.idMascota = ?;
        `;
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Mascota no encontrada'), null);
                return;
            }
            const row = results[0];
            const usuario = new Usuario(row.idUsuario, row.nombreUsuario, row.apellidoUsuario, row.telefonoUsuario);
            const mascota = new Mascota(row.idMascota, row.nombreMascota, row.pesoMascota, row.idUsuario, usuario);
            callback(null, mascota);
        });
    }

    // Método para crear una nueva mascota
    static create(nombreMascota, pesoMascota, idUsuario, callback) {
        const query = 'INSERT INTO mascotas (nombreMascota, pesoMascota, idUsuario) VALUES (?, ?, ?)';
        connection.query(query, [nombreMascota, pesoMascota, idUsuario], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const nuevaMascota = new Mascota(results.insertId, nombreMascota, pesoMascota, idUsuario);
            callback(null, nuevaMascota);
        });
    }

    // Método para actualizar una mascota por su ID
    static update(id, nombreMascota, pesoMascota, idUsuario, callback) {
        const query = 'UPDATE mascotas SET nombreMascota = ?, pesoMascota = ?, idUsuario = ? WHERE idMascota = ?';
        connection.query(query, [nombreMascota, pesoMascota, idUsuario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    // Método para eliminar una mascota por su ID
    static delete(id, callback) {
        const query = 'DELETE FROM mascotas WHERE idMascota = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Mascota;
