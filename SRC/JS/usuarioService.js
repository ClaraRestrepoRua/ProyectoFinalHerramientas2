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

    tableUsuarios(tableElementId) {
        const tableBody = document.getElementById(tableElementId);

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = "";

        // Iterar sobre los usuarios y agregar cada uno como fila a la tabla
        this.usuarios.forEach((usuario, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td scope="col" class="text-center">${index + 1}</td>
                <td scope="col" class="text-center">${usuario.nombreUsuario}</td>
                <td scope="col" class="text-center">${usuario.apellidoUsuario}</td>
                <td scope="col" class="text-center">${usuario.telefonoUsuario}</td>
                <td scope="col" class="text-center">
                <button type="button" class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.idUsuario})">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalEditarUsuario" onclick="abrirModalEdicion(${usuario.idUsuario})">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
                `;
        });
    }
}

// Instancia global del servicio de usuario
const usuarioService = new UsuarioService('http://localhost:3000/api');
