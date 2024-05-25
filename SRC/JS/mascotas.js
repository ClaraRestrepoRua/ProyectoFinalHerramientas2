// Función para enviar el formulario de mascotas
async function sendSaveMascota(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nombreMascota = formData.get('nombreMascota');
    const pesoMascota = formData.get('pesoMascota');
    const idUsuario = formData.get('selectIdUsuario');

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
