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
async function sendUpdateUsuario(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const idUsuario = formData.get('editIdUsuario');
    const nombreUsuario = formData.get('editNombreUsuario');
    const apellidoUsuario = formData.get('editApellidoUsuario');
    const telefonoUsuario = formData.get('editTelefonoUsuario');

    try {
        const usuarioActualizado = await usuarioService.updateUsuario(idUsuario, nombreUsuario, apellidoUsuario, telefonoUsuario);
        alert('Usuario actualizado:\n' + JSON.stringify(usuarioActualizado));

        // Actualizar la lista de usuarios
        usuarioService.tableUsuarios('tableUsuarios');

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarUsuario'));
        modal.hide();
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


async function abrirModalEdicion(idUsuario) {
    try {
        const usuario = await usuarioService.findById(idUsuario);

        // Llenar el formulario del modal con los datos de la mascota
        const formEditarUsuario = document.getElementById('formEditarUsuario');
        formEditarUsuario.querySelector('#editIdUsuario').value = usuario.idUsuario;
        formEditarUsuario.querySelector('#editNombreUsuario').value = usuario.nombreUsuario;
        formEditarUsuario.querySelector('#editApellidoUsuario').value = usuario.apellidoUsuario;
        formEditarUsuario.querySelector('#editTelefonoUsuario').value = usuario.telefonoUsuario;

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
        modal.show();
    } catch (error) {
        console.error('Error al abrir el modal de edición:', error);
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
document.getElementById('formEditarUsuario').addEventListener('submit', sendUpdateUsuario);

