// modelos/veterinariosMdl.js
const connection = require('../database');
const fs = require('fs');
const path = require('path');

class Veterinario {
    constructor(idVeterinario, nombreVeterinario, apellidoVeterinario, telefonoVeterinario) {
        this.idVeterinario = idVeterinario;
        this.nombreVeterinario = nombreVeterinario;
        this.apellidoVeterinario = apellidoVeterinario;
        this.telefonoVeterinario = telefonoVeterinario;
    }

    static updateVeterinariosFile(veterinarios) {
        const data = veterinarios.map(veterinario => `${veterinario.idVeterinario}, ${veterinario.nombreVeterinario}, ${veterinario.apellidoVeterinario}, ${veterinario.telefonoVeterinario}`).join('\n');
        const filePath = path.join(__dirname, '..', '..', 'DATA', 'veterinarios.txt');
        fs.writeFile(filePath, data, err => {
            if (err) {
                console.error('Error al escribir en el archivo de veterinarios:', err);
            } else {
                console.log('Archivo de veterinarios actualizado');
            }
        });
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
