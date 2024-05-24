// Escuchar el DOM
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await usuarioService.fetchUsuarios();
        usuarioService.mostrarListaUsuarios('selectIdUsuario');

        await mascotaService.fetchMascotas();
        mascotaService.selectMascotas('selectIdMascota');

        await veterinarioService.fetchVeterinarios();
        veterinarioService.selectVeterinarios('selectIdVeterinario');

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});