class MascotaService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.mascotas = [];
    }

    async saveMascota(nombreMascota, pesoMascota, idUsuario) {
        try {
            const response = await fetch(`${this.apiUrl}/mascotas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreMascota,
                    pesoMascota,
                    idUsuario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al guardar la mascota: ${errorText}`);
            }

            const nuevaMascota = await response.json();
            this.mascotas.push(nuevaMascota); // Agregar la nueva mascota a la lista local
            return nuevaMascota;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async findById(idMascota) {
        try {
            const response = await fetch(`${this.apiUrl}/mascotas/${idMascota}`);
            if (!response.ok) {
                throw new Error(`Error al obtener la mascota: ${response.statusText}`);
            }
            const mascota = await response.json();
            return mascota;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async deleteMascota(idMascota) {
        try {
            const response = await fetch(`${this.apiUrl}/mascotas/${idMascota}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar la mascota: ${response.statusText}`);
            }
            // Remover la mascota eliminada del arreglo local
            this.mascotas = this.mascotas.filter(mascota => mascota.idMascota !== idMascota);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async updateMascota(idMascota, nombreMascota, pesoMascota, idUsuario) {
        try {
            const response = await fetch(`${this.apiUrl}/mascotas/${idMascota}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreMascota,
                    pesoMascota,
                    idUsuario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al actualizar la mascota: ${errorText}`);
            }

            const mascotaActualizada = await response.json();
            const index = this.mascotas.findIndex(mascota => mascota.idMascota === idMascota);
            if (index !== -1) {
                this.mascotas[index] = mascotaActualizada; // Actualizar la mascota en la lista local
            }
            return mascotaActualizada;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async fetchMascotas() {
        try {
            const response = await fetch(`${this.apiUrl}/mascotas`);
            if (!response.ok) {
                throw new Error(`Error al obtener la lista de mascotas: ${response.statusText}`);
            }
            this.mascotas = await response.json();
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    showListMascotas(selectElementId) {
        const selectMascota = document.getElementById(selectElementId);

        // Limpiar el select
        selectMascota.innerHTML = "";

        // Agregar opción inicial sin valor
        const optionInicial = document.createElement('option');
        optionInicial.value = "0";
        optionInicial.textContent = "Seleccionar mascota";
        selectMascota.appendChild(optionInicial);

        // Iterar sobre las mascotas y agregar cada una como opción al select
        this.mascotas.forEach(mascota => {
            const option = document.createElement('option');
            option.value = mascota.idMascota;
            option.textContent = `${mascota.nombreMascota}`;
            selectMascota.appendChild(option);
        });
    }

    tableMascotas(tableElementId) {
        const tableBody = document.getElementById(tableElementId);

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = "";

        // Iterar sobre las mascotas y agregar cada una como fila a la tabla
        this.mascotas.forEach((mascota, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td scope="col" class="text-center">${index + 1}</td>
                <td scope="col" class="text-center">${mascota.nombreMascota}</td>
                <td scope="col" class="text-center">${mascota.pesoMascota}</td>
                <td scope="col" class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="sendDeleteMascota(${mascota.idMascota})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalEditarMascota" onclick="abrirModalEdicion(${mascota.idMascota})">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
        });
    }
}

// Instancia global del servicio de mascotas
const mascotaService = new MascotaService('http://localhost:3000/api');
