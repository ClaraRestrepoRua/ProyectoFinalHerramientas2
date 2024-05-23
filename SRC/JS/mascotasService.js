class MascotaService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.mascotas = [];
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

    selectMascotas(selectElementId) {
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
            option.textContent = mascota.nombreMascota;
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
                <td scope="col" class="text-center">${mascota.pesoMascota}Kg</td>
                <td scope="col" class="text-center">${mascota.nombreUsuario} ${mascota.apellidoUsuario}</td>
                <td scope="col" class="text-center">${mascota.telefonoUsuario}</td>
                <td scope="col" class="text-center">
                <button type="button" class="btn btn-danger btn-sm" onclick="eliminarMascota(${mascota.idMascota})">
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

function eliminarMascota(idMascota) {
    if (confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
        mascotaService.deleteMascota(idMascota)
            .then(() => {
                // Actualizar la tabla después de eliminar
                mascotaService.tableMascotas('tableMascotas');
            })
            .catch(error => {
                alert(`Error al eliminar la mascota: ${error.message}`);
            });
    }
}

// Instancia global del servicio de mascotas
const mascotaService = new MascotaService('http://localhost:3000/api');
