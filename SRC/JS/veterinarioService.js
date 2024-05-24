class VeterinarioService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.veterinarios = [];
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

    selectVeterinarios(selectElementId) {
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
}

// Instancia global del servicio de veterinario
const veterinarioService = new VeterinarioService('http://localhost:3000/api');
