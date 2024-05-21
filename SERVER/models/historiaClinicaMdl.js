// modelos/historiaClinicaMdl.js
const connection = require('../database');

class HistoriaClinica {
    constructor(idHistoriaClinica, descripcionClinica, medicamento, idMascota, idVeterinario) {
        this.idHistoriaClinica = idHistoriaClinica;
        this.descripcionClinica = descripcionClinica;
        this.medicamento = medicamento;
        this.idMascota = idMascota;
        this.idVeterinario = idVeterinario;
    }

    // Método para obtener todas las historias clínicas
    static getAll(callback) {
        connection.query('SELECT * FROM historiaclinica', (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const historiasClinicas = results.map(row => new HistoriaClinica(row.idHistoriaClinica, row.descripcionClinica, row.medicamento, row.idMascota, row.idVeterinario));
            callback(null, historiasClinicas);
        });
    }

    // Método para obtener una historia clínica por su ID
    static getById(id, callback) {
        connection.query('SELECT * FROM historiaclinica WHERE idHistoriaClinica = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Historia clínica no encontrada'), null);
                return;
            }
            const historiaClinica = new HistoriaClinica(results[0].idHistoriaClinica, results[0].descripcionClinica, results[0].medicamento, results[0].idMascota, results[0].idVeterinario);
            callback(null, historiaClinica);
        });
    }

    // Método para crear una nueva historia clínica
    static create(descripcionClinica, medicamento, idMascota, idVeterinario, callback) {
        connection.query('INSERT INTO historiaclinica (descripcionClinica, medicamento, idMascota, idVeterinario) VALUES (?, ?, ?, ?)', [descripcionClinica, medicamento, idMascota, idVeterinario], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const nuevaHistoriaClinica = new HistoriaClinica(results.insertId, descripcionClinica, medicamento, idMascota, idVeterinario);
            callback(null, nuevaHistoriaClinica);
        });
    }

    // Método para actualizar una historia clínica por su ID
    static update(id, descripcionClinica, medicamento, idMascota, idVeterinario, callback) {
        connection.query('UPDATE historiaclinica SET descripcionClinica = ?, medicamento = ?, idMascota = ?, idVeterinario = ? WHERE idHistoriaClinica = ?', [descripcionClinica, medicamento, idMascota, idVeterinario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    // Método para eliminar una historia clínica por su ID
    static delete(id, callback) {
        connection.query('DELETE FROM historiaclinica WHERE idHistoriaClinica = ?', [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = HistoriaClinica;
