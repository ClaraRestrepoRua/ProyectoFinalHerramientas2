class VeterinarioService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.veterinarios = [];
    }

    async saveVeterinario(nombreVeterinario, apellidoVeterinario, telefonoVeterinario) {
        try {
            const response = await fetch(`${this.apiUrl}/veterinarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreVeterinario,
                    apellidoVeterinario,
                    telefonoVeterinario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al guardar el veterinario: ${errorText}`);
            }

            const nuevoVeterinario = await response.json();
            this.veterinarios.push(nuevoVeterinario); // Agregar el nuevo veterinario a la lista local
            return nuevoVeterinario;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async findById(idVeterinario) {
        try {
            const response = await fetch(`${this.apiUrl}/veterinarios/${idVeterinario}`);
            if (!response.ok) {
                throw new Error(`Error al obtener el veterinario: ${response.statusText}`);
            }
            const veterinario = await response.json();
            return veterinario;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async deleteVeterinario(idVeterinario) {
        try {
            const response = await fetch(`${this.apiUrl}/veterinarios/${idVeterinario}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar el veterinario: ${response.statusText}`);
            }
            // Remover el veterinario eliminado del arreglo local
            this.veterinarios = this.veterinarios.filter(veterinario => veterinario.idVeterinario !== idVeterinario);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async updateVeterinario(idVeterinario, nombreVeterinario, apellidoVeterinario, telefonoVeterinario) {
        try {
            const response = await fetch(`${this.apiUrl}/veterinarios/${idVeterinario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreVeterinario,
                    apellidoVeterinario,
                    telefonoVeterinario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al actualizar el veterinario: ${errorText}`);
            }

            const veterinarioActualizado = await response.json();
            const index = this.veterinarios.findIndex(veterinario => veterinario.idVeterinario === idVeterinario);
            if (index !== -1) {
                this.veterinarios[index] = veterinarioActualizado; // Actualizar el veterinario en la lista local
            }
            return veterinarioActualizado;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async fetchVeterinarios() {
        try {
            const response = await fetch(`${this.apiUrl}/veterinarios`);
            if (!response.ok) {
                throw new Error(`Error al obtener la lista de veterinarios: ${response.statusText}`);
            }
            this.veterinarios = await response.json();
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    showListVeterinarios(selectElementId) {
        const selectVeterinario = document.getElementById(selectElementId);

        // Limpiar el select
        selectVeterinario.innerHTML = "";

        // Agregar opción inicial sin valor
        const optionInicial = document.createElement('option');
        optionInicial.value = "0";
        optionInicial.textContent = "Seleccionar veterinario";
        selectVeterinario.appendChild(optionInicial);

        // Iterar sobre los veterinarios y agregar cada uno como opción al select
        this.veterinarios.forEach(veterinario => {
            const option = document.createElement('option');
            option.value = veterinario.idVeterinario;
            option.textContent = `${veterinario.nombreVeterinario} ${veterinario.apellidoVeterinario}`;
            selectVeterinario.appendChild(option);
        });
    }

    tableVeterinarios(tableElementId) {
        const tableBody = document.getElementById(tableElementId);

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = "";

        // Iterar sobre los veterinarios y agregar cada uno como fila a la tabla
        this.veterinarios.forEach((veterinario, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td scope="col" class="text-center">${index + 1}</td>
                <td scope="col" class="text-center">${veterinario.nombreVeterinario}</td>
                <td scope="col" class="text-center">${veterinario.apellidoVeterinario}</td>
                <td scope="col" class="text-center">${veterinario.telefonoVeterinario}</td>
                <td scope="col" class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="sendDeleteVeterinario(${veterinario.idVeterinario})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
        });
    }
}

// Instancia global del servicio de veterinarios
const veterinarioService = new VeterinarioService('http://localhost:3000/api');
