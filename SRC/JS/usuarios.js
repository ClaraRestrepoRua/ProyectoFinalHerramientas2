// Función para enviar el formulario de usuarios
async function sendSaveUsuario(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nombreUsuario = formData.get('nombreUsuario');
    const apellidoUsuario = formData.get('apellidoUsuario');
    const telefonoUsuario = formData.get('telefonoUsuario');

    try {
        const nuevoUsuario = await usuarioService.saveUsuario(nombreUsuario, apellidoUsuario, telefonoUsuario);
        alert('Usuario creado:\n' + JSON.stringify(nuevoUsuario));
        // Limpiar los campos del formulario después de que se haya creado la mascota
        event.target.reset();

        // Actualizar la lista de usuarios
        usuarioService.tableUsuarios('tableUsuarios');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

function sendDeleteUsuario(idUsuario) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        usuarioService.deleteUsuario(idUsuario)
            .then(() => {
                // Actualizar la tabla después de eliminar
                usuarioService.tableUsuarios('tableUsuarios');
            })
            .catch(error => {
                alert(`Error al eliminar el usuario: ${error.message}`);
            });
    }
}


// Escuchar el DOM
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await usuarioService.fetchUsuarios();
        usuarioService.tableUsuarios('tableUsuarios');

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});

// Escuchar el evento submit del formulario de usuarios
document.getElementById('frmUsuarios').addEventListener('submit', sendSaveUsuario);

