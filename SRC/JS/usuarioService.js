class UsuarioService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.usuarios = [];
    }

    async fetchUsuarios() {
        try {
            const response = await fetch(`${this.apiUrl}/usuarios`);
            if (!response.ok) {
                throw new Error(`Error al obtener la lista de usuarios: ${response.statusText}`);
            }
            this.usuarios = await response.json();
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    mostrarListaUsuarios(selectElementId) {
        const selectUsuario = document.getElementById(selectElementId);

        // Limpiar el select
        selectUsuario.innerHTML = "";

        // Agregar opción inicial sin valor
        const optionInicial = document.createElement('option');
        optionInicial.value = "0";
        optionInicial.textContent = "Seleccionar usuario";
        selectUsuario.appendChild(optionInicial);

        // Iterar sobre los usuarios y agregar cada uno como opción al select
        this.usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.idUsuario;
            option.textContent = `${usuario.nombreUsuario} ${usuario.apellidoUsuario}`;
            selectUsuario.appendChild(option);
        });
    }
}

// Instancia global del servicio de usuario
const usuarioService = new UsuarioService('http://localhost:3000/api');
