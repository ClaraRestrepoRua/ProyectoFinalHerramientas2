// modelos/mascotasMdl.js
const connection = require('../database');

class Mascota {
    constructor(idMascota, nombreMascota, pesoMascota, idUsuario) {
        this.idMascota = idMascota;
        this.nombreMascota = nombreMascota;
        this.pesoMascota = pesoMascota;
        this.idUsuario = idUsuario;
    }

    // Método para obtener todas las mascotas
    static getAll(callback) {
        connection.query('SELECT * FROM mascotas', (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const mascotas = results.map(row => new Mascota(row.idMascota, row.nombreMascota, row.pesoMascota, row.idUsuario));
            callback(null, mascotas);
        });
    }

    // Método para obtener una mascota por su ID
    static getById(id, callback) {
        connection.query('SELECT * FROM mascotas WHERE idMascota = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Mascota no encontrada'), null);
                return;
            }
            const mascota = new Mascota(results[0].idMascota, results[0].nombreMascota, results[0].pesoMascota, results[0].idUsuario);
            callback(null, mascota);
        });
    }

    // Método para crear una nueva mascota
    static create(nombreMascota, pesoMascota, idUsuario, callback) {
        connection.query('INSERT INTO mascotas (nombreMascota, pesoMascota, idUsuario) VALUES (?, ?, ?)', [nombreMascota, pesoMascota, idUsuario], (err, results) => {
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
        connection.query('UPDATE mascotas SET nombreMascota = ?, pesoMascota = ?, idUsuario = ? WHERE idMascota = ?', [nombreMascota, pesoMascota, idUsuario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    // Método para eliminar una mascota por su ID
    static delete(id, callback) {
        connection.query('DELETE FROM mascotas WHERE idMascota = ?', [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Mascota;
