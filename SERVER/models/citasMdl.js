// models/citasMdl.js
const connection = require('../database');

class Cita {
    constructor(idCita, fechaCita, idUsuario, idMascota, idVeterinario) {
        this.idCita = idCita;
        this.fechaCita = fechaCita;
        this.idUsuario = idUsuario;
        this.idMascota = idMascota;
        this.idVeterinario = idVeterinario;
    }

    // Método para obtener todas las citas
    static getAll(callback) {
        connection.query('SELECT * FROM citas', (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const citas = results.map(row => new Cita(row.idCita, row.fechaCita, row.idUsuario, row.idMascota, row.idVeterinario));
            callback(null, citas);
        });
    }

    // Método para obtener una cita por su ID
    static getById(id, callback) {
        connection.query('SELECT * FROM citas WHERE idCita = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Cita no encontrada'), null);
                return;
            }
            const cita = new Cita(results[0].idCita, results[0].fechaCita, results[0].idUsuario, results[0].idMascota, results[0].idVeterinario);
            callback(null, cita);
        });
    }

    // Método para crear una nueva cita
    static create(fechaCita, idUsuario, idMascota, idVeterinario, callback) {
        connection.query('INSERT INTO citas (fechaCita, idUsuario, idMascota, idVeterinario) VALUES (?, ?, ?, ?)', [fechaCita, idUsuario, idMascota, idVeterinario], (err, results) => {
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
        connection.query('UPDATE citas SET fechaCita = ?, idUsuario = ?, idMascota = ?, idVeterinario = ? WHERE idCita = ?', [fechaCita, idUsuario, idMascota, idVeterinario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    // Método para eliminar una cita por su ID
    static delete(id, callback) {
        connection.query('DELETE FROM citas WHERE idCita = ?', [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Cita;
