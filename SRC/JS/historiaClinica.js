// Función para enviar el formulario de historias clínicas
async function sendSaveHistoriaClinica(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const descripcionClinica = formData.get('descripcionClinica');
    const medicamento = formData.get('medicamento');
    const idMascota = formData.get('selectIdMascota');
    const idVeterinario = formData.get('selectIdVeterinario');

    try {
        const nuevaHistoriaClinica = await historiaClinicaService.saveHistoriaClinica(descripcionClinica, medicamento, idMascota, idVeterinario);
        alert('Historia clínica creada:\n' + JSON.stringify(nuevaHistoriaClinica));
        // Limpiar los campos del formulario después de que se haya creado la historia clínica
        event.target.reset();

        // Actualizar la lista de historias clínicas
        historiaClinicaService.tableHistoriasClinicas('tableHistoriasClinicas');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Función para eliminar una historia clínica
async function sendDeleteHistoriaClinica(idHistoriaClinica) {
    try {
        await historiaClinicaService.deleteHistoriaClinica(idHistoriaClinica);
        alert('Historia clínica eliminada');
        // Actualizar la lista de historias clínicas
        historiaClinicaService.tableHistoriasClinicas('tableHistoriasClinicas');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Llenar los select de mascotas y veterinarios cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
    try {

        await mascotaService.fetchMascotas();
        mascotaService.showListMascotas('selectIdMascota');

        await veterinarioService.fetchVeterinarios();
        veterinarioService.showListVeterinarios('selectIdVeterinario');

        await historiaClinicaService.fetchHistoriasClinicas();
        historiaClinicaService.tableHistoriasClinicas('tableHistoriasClinicas');


    } catch (error) {
        console.error('Error al cargar los datos iniciales:', error.message);
    }
});

// Escuchar el evento submit del formulario de historias clínicas
document.getElementById('frmHistoriasClinicas').addEventListener('submit', sendSaveHistoriaClinica);
