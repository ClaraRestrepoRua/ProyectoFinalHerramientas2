// Escuchar el DOM
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await mascotaService.fetchMascotas();
        mascotaService.selectMascotas('selectIdMascota');

        await veterinarioService.fetchVeterinarios();
        veterinarioService.selectVeterinarios('selectIdVeterinario');

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});