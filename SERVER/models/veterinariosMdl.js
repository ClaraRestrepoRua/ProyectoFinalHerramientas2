// modelos/veterinariosMdl.js
const connection = require('../database');

class Veterinario {
    constructor(idVeterinario, nombreVeterinario, apellidoVeterinario, telefonoVeterinario) {
        this.idVeterinario = idVeterinario;
        this.nombreVeterinario = nombreVeterinario;
        this.apellidoVeterinario = apellidoVeterinario;
        this.telefonoVeterinario = telefonoVeterinario;
    }

    static getAll(callback) {
        connection.query('SELECT * FROM veterinarios', (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const veterinarios = results.map(row => new Veterinario(row.idVeterinario, row.nombreVeterinario, row.apellidoVeterinario, row.telefonoVeterinario));
            callback(null, veterinarios);
        });
    }

    static getById(id, callback) {
        connection.query('SELECT * FROM veterinarios WHERE idVeterinario = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Veterinario no encontrado'), null);
                return;
            }
            const veterinario = new Veterinario(results[0].idVeterinario, results[0].nombreVeterinario, results[0].apellidoVeterinario, results[0].telefonoVeterinario);
            callback(null, veterinario);
        });
    }

    static create(nombreVeterinario, apellidoVeterinario, telefonoVeterinario, callback) {
        connection.query('INSERT INTO veterinarios (nombreVeterinario, apellidoVeterinario, telefonoVeterinario) VALUES (?, ?, ?)', [nombreVeterinario, apellidoVeterinario, telefonoVeterinario], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const nuevoVeterinario = new Veterinario(results.insertId, nombreVeterinario, apellidoVeterinario, telefonoVeterinario);
            callback(null, nuevoVeterinario);
        });
    }

    static update(id, nombreVeterinario, apellidoVeterinario, telefonoVeterinario, callback) {
        connection.query('UPDATE veterinarios SET nombreVeterinario = ?, apellidoVeterinario = ?, telefonoVeterinario = ? WHERE idVeterinario = ?', [nombreVeterinario, apellidoVeterinario, telefonoVeterinario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    static delete(id, callback) {
        connection.query('DELETE FROM veterinarios WHERE idVeterinario = ?', [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Veterinario;
