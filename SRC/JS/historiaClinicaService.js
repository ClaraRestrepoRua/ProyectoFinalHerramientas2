class HistoriaClinicaService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.historiasClinicas = [];
    }

    async saveHistoriaClinica(descripcionClinica, medicamento, idMascota, idVeterinario) {
        try {
            const response = await fetch(`${this.apiUrl}/historias_clinicas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    descripcionClinica,
                    medicamento,
                    idMascota,
                    idVeterinario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al guardar la historia clínica: ${errorText}`);
            }

            const nuevaHistoriaClinica = await response.json();

            // Hacer una llamada adicional para obtener la información completa de la historia clínica
            const historiaClinicaCompleta = await this.findById(nuevaHistoriaClinica.idHistoriaClinica);
            this.historiasClinicas.push(historiaClinicaCompleta); // Agregar la nueva historia clínica a la lista local con la información completa
            return historiaClinicaCompleta;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async findById(idHistoriaClinica) {
        try {
            const response = await fetch(`${this.apiUrl}/historias_clinicas/${idHistoriaClinica}`);
            if (!response.ok) {
                throw new Error(`Error al obtener la historia clínica: ${response.statusText}`);
            }
            const historiaClinica = await response.json();
            return historiaClinica;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async deleteHistoriaClinica(idHistoriaClinica) {
        try {
            const response = await fetch(`${this.apiUrl}/historias_clinicas/${idHistoriaClinica}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar la historia clínica: ${response.statusText}`);
            }
            // Remover la historia clínica eliminada del arreglo local
            this.historiasClinicas = this.historiasClinicas.filter(historiaClinica => historiaClinica.idHistoriaClinica !== idHistoriaClinica);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async fetchHistoriasClinicas() {
        try {
            const response = await fetch(`${this.apiUrl}/historias_clinicas`);
            if (!response.ok) {
                throw new Error(`Error al obtener la lista de historias clínicas: ${response.statusText}`);
            }
            this.historiasClinicas = await response.json();
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    tableHistoriasClinicas(tableElementId) {
        const tableBody = document.getElementById(tableElementId);

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = "";

        // Iterar sobre las historias clínicas y agregar cada una como fila a la tabla
        this.historiasClinicas.forEach((historiaClinica, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td scope="col" class="text-center">${index + 1}</td>
                <td scope="col" class="text-center">${historiaClinica.descripcionClinica}</td>
                <td scope="col" class="text-center">${historiaClinica.medicamento}</td>
                <td scope="col" class="text-center">${historiaClinica.mascota.nombreMascota}</td>
                <td scope="col" class="text-center">${historiaClinica.veterinario.nombreVeterinario}</td>
                <td scope="col" class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="sendDeleteHistoriaClinica(${historiaClinica.idHistoriaClinica})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
        });
    }
}

// Instancia global del servicio de historias clínicas
const historiaClinicaService = new HistoriaClinicaService('http://localhost:3000/api');
