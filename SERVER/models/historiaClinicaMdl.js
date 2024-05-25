// modelos/historiaClinicaMdl.js
const connection = require('../database');
const fs = require('fs');
const path = require('path');
const Mascota = require('./mascotasMdl');
const Veterinario = require('./veterinariosMdl');
const Usuario = require('./usuariosMdl');

class HistoriaClinica {
    constructor(idHistoriaClinica, descripcionClinica, medicamento, idMascota, idVeterinario, mascota = null, veterinario = null) {
        this.idHistoriaClinica = idHistoriaClinica;
        this.descripcionClinica = descripcionClinica;
        this.medicamento = medicamento;
        this.idMascota = idMascota;
        this.idVeterinario = idVeterinario;
        this.mascota = mascota;
        this.veterinario = veterinario;
    }

    static updateHistoriasClinicasFile(historiasClinicas) {
        const data = historiasClinicas.map(historiaClinica => `${historiaClinica.idHistoriaClinica}, ${historiaClinica.descripcionClinica}, ${historiaClinica.medicamento}, ${historiaClinica.mascota.idMascota}, ${historiaClinica.mascota.nombreMascota}, ${historiaClinica.mascota.pesoMascota}, ${historiaClinica.idVeterinario}${historiaClinica.veterinario.idVeterinario}, ${historiaClinica.veterinario.nombreVeterinario}, ${historiaClinica.veterinario.apellidoVeterinario}, ${historiaClinica.veterinario.telefonoVeterinario}`).join('\n');
        const filePath = path.join(__dirname, '..', '..', 'DATA', 'historiasClinicas.txt');
        fs.writeFile(filePath, data, err => {
            if (err) {
                console.error('Error al escribir en el archivo de historias clínicas:', err);
            } else {
                console.log('Archivo de historias clínicas actualizado');
            }
        });
    }

    // Método para obtener todas las historias clínicas
    static getAll(callback) {
        const query = `
            SELECT *
            FROM historiaclinica
            INNER JOIN mascotas ON historiaclinica.idMascota = mascotas.idMascota
            INNER JOIN veterinarios ON historiaclinica.idVeterinario = veterinarios.idVeterinario
            INNER JOIN usuarios ON mascotas.idUsuario = usuarios.idUsuario;;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            const historiasClinicas = results.map(row => {
                const usuario = new Usuario(row.idUsuario, row.nombreUsuario, row.apellidoUsuario, row.telefonoUsuario);
                const mascota = new Mascota(row.idMascota, row.nombreMascota, row.pesoMascota, row.idUsuario, usuario);
                const veterinario = new Veterinario(row.idVeterinario, row.nombreVeterinario, row.apellidoVeterinario, row.telefonoVeterinario);
                return new HistoriaClinica(row.idHistoriaClinica, row.descripcionClinica, row.medicamento, row.idMascota, row.idVeterinario, mascota, veterinario);
            });
            callback(null, historiasClinicas);
        });
    }

    // Método para obtener una historia clínica por su ID
    static getById(id, callback) {
        const query = `
            SELECT *
            FROM historiaclinica
            INNER JOIN mascotas ON historiaclinica.idMascota = mascotas.idMascota
            INNER JOIN veterinarios ON historiaclinica.idVeterinario = veterinarios.idVeterinario
            WHERE historiaclinica.idHistoriaClinica = ?;
        `;
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Historia clínica no encontrada'), null);
                return;
            }
            const row = results[0];
            const mascota = new Mascota(row.idMascota, row.nombreMascota, row.pesoMascota, row.idUsuario);
            const veterinario = new Veterinario(row.idVeterinario, row.nombreVeterinario, row.apellidoVeterinario, row.telefonoVeterinario);
            const historiaClinica = new HistoriaClinica(row.idHistoriaClinica, row.descripcionClinica, row.medicamento, row.idMascota, row.idVeterinario, mascota, veterinario);
            callback(null, historiaClinica);
        });
    }

    // Método para crear una nueva historia clínica
    static create(descripcionClinica, medicamento, idMascota, idVeterinario, callback) {
        const query = 'INSERT INTO historiaclinica (descripcionClinica, medicamento, idMascota, idVeterinario) VALUES (?, ?, ?, ?)';
        connection.query(query, [descripcionClinica, medicamento, idMascota, idVeterinario], (err, results) => {
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
        const query = 'UPDATE historiaclinica SET descripcionClinica = ?, medicamento = ?, idMascota = ?, idVeterinario = ? WHERE idHistoriaClinica = ?';
        connection.query(query, [descripcionClinica, medicamento, idMascota, idVeterinario, id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    // Método para eliminar una historia clínica por su ID
    static delete(id, callback) {
        const query = 'DELETE FROM historiaclinica WHERE idHistoriaClinica = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = HistoriaClinica;
