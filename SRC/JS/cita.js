// Función para enviar el formulario de citas
async function sendSaveCita(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fechaCita = formData.get('fechaCita');
    const idUsuario = formData.get('selectIdUsuario');
    const idMascota = formData.get('selectIdMascota');
    const idVeterinario = formData.get('selectIdVeterinario');

    try {
        const nuevaCita = await citaService.saveCita(fechaCita, idUsuario, idMascota, idVeterinario);
        alert('Cita creada:\n' + JSON.stringify(nuevaCita));
        // Limpiar los campos del formulario después de que se haya creado la cita
        event.target.reset();

        // Actualizar la lista de citas
        citaService.tableCitas('tableCitas');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Función para eliminar una cita
function sendDeleteCita(idCita) {
    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
        citaService.deleteCita(idCita)
            .then(() => {
                // Actualizar la tabla después de eliminar
                citaService.tableCitas('tableCitas');
            })
            .catch(error => {
                alert(`Error al eliminar la cita: ${error.message}`);
            });
    }
}

// Escuchar el DOM
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await citaService.fetchCitas();
        citaService.tableCitas('tableCitas');

        await usuarioService.fetchUsuarios();
        usuarioService.showListUsuarios('selectIdUsuario');

        await mascotaService.fetchMascotas();
        mascotaService.showListMascotas('selectIdMascota');

        await veterinarioService.fetchVeterinarios();
        veterinarioService.showListVeterinarios('selectIdVeterinario');
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});

// Escuchar el evento submit del formulario de citas
document.getElementById('frmCitas').addEventListener('submit', sendSaveCita);
