// Función para enviar el formulario de veterinarios
async function sendSaveVeterinario(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nombreVeterinario = formData.get('nombreVeterinario');
    const apellidoVeterinario = formData.get('apellidoVeterinario');
    const telefonoVeterinario = formData.get('telefonoVeterinario');

    try {
        const nuevoVeterinario = await veterinarioService.saveVeterinario(nombreVeterinario, apellidoVeterinario, telefonoVeterinario);
        alert('Veterinario creado:\n' + JSON.stringify(nuevoVeterinario));
        // Limpiar los campos del formulario después de que se haya creado el veterinario
        event.target.reset();

        // Actualizar la lista de veterinarios
        veterinarioService.tableVeterinarios('tableVeterinarios');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Función para eliminar un veterinario
function sendDeleteVeterinario(idVeterinario) {
    if (confirm('¿Estás seguro de que quieres eliminar este veterinario?')) {
        veterinarioService.deleteVeterinario(idVeterinario)
            .then(() => {
                // Actualizar la tabla después de eliminar
                veterinarioService.tableVeterinarios('tableVeterinarios');
            })
            .catch(error => {
                alert(`Error al eliminar el veterinario: ${error.message}`);
            });
    }
}

// Escuchar el DOM
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await veterinarioService.fetchVeterinarios();
        veterinarioService.tableVeterinarios('tableVeterinarios');
    } catch (error) {
        console.error('Error al cargar los datos de los veterinarios:', error);
    }
});

// Escuchar el evento submit del formulario de veterinarios
document.getElementById('frmVeterinarios').addEventListener('submit', sendSaveVeterinario);
