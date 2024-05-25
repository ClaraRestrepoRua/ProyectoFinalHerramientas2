class UsuarioService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.usuarios = [];
    }

    async saveUsuario(nombreUsuario, apellidoUsuario, telefonoUsuario) {
        try {
            const response = await fetch(`${this.apiUrl}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreUsuario,
                    apellidoUsuario,
                    telefonoUsuario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al guardar el usuario: ${errorText}`);
            }

            const nuevoUsuario = await response.json();
            this.usuarios.push(nuevoUsuario); // Agregar el nuevo usuario a la lista local
            return nuevoUsuario;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async findById(idUsuario) {
        try {
            const response = await fetch(`${this.apiUrl}/usuarios/${idUsuario}`);
            if (!response.ok) {
                throw new Error(`Error al obtener el usuario: ${response.statusText}`);
            }
            const usuario = await response.json();
            return usuario;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async deleteUsuario(idUsuario) {
        try {
            const response = await fetch(`${this.apiUrl}/usuarios/${idUsuario}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
            }
            // Remover el usuario eliminado del arreglo local
            this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario !== idUsuario);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }



    async updateUsuario(idUsuario, nombreUsuario, apellidoUsuario, telefonoUsuario) {
        try {
            const response = await fetch(`${this.apiUrl}/usuarios/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreUsuario,
                    apellidoUsuario,
                    telefonoUsuario
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al actualizar el usuario: ${errorText}`);
            }

            const usuarioActualizado = await response.json();
            const index = this.usuarios.findIndex(usuario => usuario.idUsuario === idUsuario);
            if (index !== -1) {
                this.usuarios[index] = usuarioActualizado; // Actualizar el usuario en la lista local
            }
            return usuarioActualizado;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
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

    showListUsuarios(selectElementId) {
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
                <button type="button" class="btn btn-danger btn-sm" onclick="sendDeleteUsuario(${usuario.idUsuario})">
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
