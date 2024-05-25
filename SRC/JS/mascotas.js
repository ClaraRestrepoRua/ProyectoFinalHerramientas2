// Función para enviar el formulario de mascotas
async function sendSaveMascota(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nombreMascota = formData.get('nombreMascota');
    const pesoMascota = formData.get('pesoMascota');
    const idUsuario = formData.get('idUsuario');

    try {
        const nuevaMascota = await mascotaService.saveMascota(nombreMascota, pesoMascota, idUsuario);
        alert('Mascota creada:\n' + JSON.stringify(nuevaMascota));
        // Limpiar los campos del formulario después de que se haya creado la mascota
        event.target.reset();

        // Actualizar la lista de mascotas
        mascotaService.tableMascotas('tableMascotas');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Función para enviar el formulario de actualización de mascotas
async function sendUpdateMascota(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const idMascota = formData.get('editIdMascota');
    const nombreMascota = formData.get('editNombreMascota');
    const pesoMascota = formData.get('editPesoMascota');
    const idUsuario = formData.get('editIdUsuario');

    try {
        const mascotaActualizada = await mascotaService.updateMascota(idMascota, nombreMascota, pesoMascota, idUsuario);
        alert('Mascota actualizada:\n' + JSON.stringify(mascotaActualizada));

        // Actualizar la lista de mascotas
        mascotaService.tableMascotas('tableMascotas');

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarMascota'));
        modal.hide();
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Función para eliminar una mascota
function sendDeleteMascota(idMascota) {
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

// Función para abrir el modal de edición de mascotas
async function abrirModalEdicionMascota(idMascota) {
    try {
        const mascota = await mascotaService.findById(idMascota);

        // Llenar el formulario del modal con los datos de la mascota
        const formEditarMascota = document.getElementById('formEditarMascota');
        formEditarMascota.querySelector('#editIdMascota').value = mascota.idMascota;
        formEditarMascota.querySelector('#editIdUsuario').value = mascota.idUsuario;
        formEditarMascota.querySelector('#editNombreMascota').value = mascota.nombreMascota;
        formEditarMascota.querySelector('#editPesoMascota').value = mascota.pesoMascota;

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('modalEditarMascota'));
        modal.show();
    } catch (error) {
        console.error('Error al abrir el modal de edición de mascotas:', error);
    }
}

// Escuchar el DOM
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await mascotaService.fetchMascotas();
        mascotaService.tableMascotas('tableMascotas');

        await usuarioService.fetchUsuarios();
        usuarioService.showListUsuarios('selectIdUsuario');
    } catch (error) {
        console.error('Error al cargar los datos de las mascotas:', error);
    }
});

// Escuchar el evento submit del formulario de mascotas
document.getElementById('frmMascotas').addEventListener('submit', sendSaveMascota);
document.getElementById('formEditarMascota').addEventListener('submit', sendUpdateMascota);
