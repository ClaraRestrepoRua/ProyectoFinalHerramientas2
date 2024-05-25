// models/citasMdl.js
const connection = require('../database');
const Usuario = require('./usuariosMdl');
const Mascota = require('./mascotasMdl');
const Veterinario = require('./veterinariosMdl');

class Cita {
    constructor(idCita, fechaCita, idUsuario, idMascota, idVeterinario, usuario = null, mascota = null, veterinario = null) {
        this.idCita = idCita;
        this.fechaCita = fechaCita;
        this.idUsuario = idUsuario;
        this.idMascota = idMascota;
        this.idVeterinario = idVeterinario;
        this.usuario = usuario;
        this.mascota = mascota;
        this.veterinario = veterinario;
    }

    // Método para obtener todas las citas
    static getAll(callback) {
        const query = `
            SELECT * FROM citas
            INNER JOIN usuarios ON citas.idUsuario = usuarios.idUsuario
            INNER JOIN mascotas ON citas.idMascota = mascotas.idMascota
            INNER JOIN veterinarios ON citas.idVeterinario = veterinarios.idVeterinario;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const citas = results.map(row => {
                const usuario = new Usuario(row.idUsuario, row.nombreUsuario, row.apellidoUsuario, row.telefonoUsuario);
                const mascota = new Mascota(row.idMascota, row.nombreMascota, row.pesoMascota, row.idUsuario);
                const veterinario = new Veterinario(row.idVeterinario, row.nombreVeterinario, row.apellidoVeterinario, row.telefonoVeterinario);
                return new Cita(row.idCita, row.fechaCita, row.idUsuario, row.idMascota, row.idVeterinario, usuario, mascota, veterinario);
            });
            callback(null, citas);
        });
    }

    // Método para obtener una cita por su ID
    static getById(id, callback) {
        const query = `
            SELECT *
            FROM citas
            INNER JOIN usuarios ON citas.idUsuario = usuarios.idUsuario
            INNER JOIN mascotas ON citas.idMascota = mascotas.idMascota
            INNER JOIN veterinarios ON citas.idVeterinario = veterinarios.idVeterinario
            WHERE citas.idCita = ?;
        `;
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Cita no encontrada'), null);
                return;
            }
            const row = results[0];
            const usuario = new Usuario(row.idUsuario, row.nombreUsuario, row.apellidoUsuario, row.telefonoUsuario);
            const mascota = new Mascota(row.idMascota, row.nombreMascota, row.pesoMascota, row.mascotaIdUsuario);
            const veterinario = new Veterinario(row.idVeterinario, row.nombreVeterinario, row.apellidoVeterinario, row.telefonoVeterinario);
            const cita = new Cita(row.idCita, row.fechaCita, row.idUsuario, row.idMascota, row.idVeterinario, usuario, mascota, veterinario);
            callback(null, cita);
        });
    }

    // Método para crear una nueva cita
    static create(fechaCita, idUsuario, idMascota, idVeterinario, callback) {
        const query = 'INSERT INTO citas (fechaCita, idUsuario, idMascota, idVeterinario) VALUES (?, ?, ?, ?)';
        connection.query(query, [fechaCita, idUsuario, idMascota, idVeterinario], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const nuevaCita = new Cita(results.insertId, fechaCita, idUsuario, idMascota, idVeterinario);
            callback(null, nuevaCita);
        });
    }

    // Método para actualizar una cita por su ID
    static update(id, fechaCita, idUsuario, idMascota, idVeterinario, callback) {
        const query = 'UPDATE citas SET fechaCita = ?, idUsuario = ?, idMascota = ?, idVeterinario = ? WHERE idCita = ?';
        connection.query(query, [fechaCita, idUsuario, idMascota, idVeterinario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    // Método para eliminar una cita por su ID
    static delete(id, callback) {
        const query = 'DELETE FROM citas WHERE idCita = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Cita;
