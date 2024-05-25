class CitaService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.citas = [];
    }

    async saveCita(fechaCita, idUsuario, idMascota, idVeterinario) {
        try {
            const response = await fetch(`${this.apiUrl}/citas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fechaCita,
                    idUsuario,
                    idMascota,
                    idVeterinario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al guardar la cita: ${errorText}`);
            }

            const nuevaCita = await response.json();

            // Hacer una llamada adicional para obtener la información completa de la cita
            const citaCompleta = await this.findById(nuevaCita.idCita);
            this.citas.push(citaCompleta); // Agregar la nueva cita a la lista local con la información completa
            return citaCompleta;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async findById(idCita) {
        try {
            const response = await fetch(`${this.apiUrl}/citas/${idCita}`);
            if (!response.ok) {
                throw new Error(`Error al obtener la cita: ${response.statusText}`);
            }
            const cita = await response.json();
            return cita;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async deleteCita(idCita) {
        try {
            const response = await fetch(`${this.apiUrl}/citas/${idCita}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar la cita: ${response.statusText}`);
            }
            // Remover la cita eliminada del arreglo local
            this.citas = this.citas.filter(cita => cita.idCita !== idCita);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async updateCita(idCita, fechaCita, idUsuario, idMascota, idVeterinario) {
        try {
            const response = await fetch(`${this.apiUrl}/citas/${idCita}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fechaCita,
                    idUsuario,
                    idMascota,
                    idVeterinario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al actualizar la cita: ${errorText}`);
            }

            const citaActualizada = await response.json();
            const index = this.citas.findIndex(cita => cita.idCita === idCita);
            if (index !== -1) {
                this.citas[index] = citaActualizada; // Actualizar la cita en la lista local
            }
            return citaActualizada;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async fetchCitas() {
        try {
            const response = await fetch(`${this.apiUrl}/citas`);
            if (!response.ok) {
                throw new Error(`Error al obtener la lista de citas: ${response.statusText}`);
            }
            this.citas = await response.json();
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    tableCitas(tableElementId) {
        const tableBody = document.getElementById(tableElementId);

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = "";

        // Iterar sobre las citas y agregar cada una como fila a la tabla
        this.citas.forEach((cita, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td scope="col" class="text-center">${index + 1}</td>
                <td scope="col" class="text-center">${cita.fechaCita}</td>
                <td scope="col" class="text-center">${cita.veterinario.nombreVeterinario} ${cita.veterinario.apellidoVeterinario}</td>
                <td scope="col" class="text-center">${cita.usuario.nombreUsuario} ${cita.usuario.apellidoUsuario}</td>
                <td scope="col" class="text-center">${cita.mascota.nombreMascota}</td>
                <td scope="col" class="text-center">${cita.mascota.pesoMascota}</td>
                
                <td scope="col" class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="sendDeleteCita(${cita.idCita})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
        });
    }
}

// Instancia global del servicio de citas
const citaService = new CitaService('http://localhost:3000/api');
