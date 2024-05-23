// Función para enviar el formulario de mascotas
async function enviarFormularioMascota(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nombreMascota = formData.get('nombreMascota');
    const pesoMascota = formData.get('pesoMascota');
    const idUsuario = formData.get('selectIdUsuario');

    try {
        const response = await fetch('http://localhost:3000/api/mascotas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreMascota,
                pesoMascota,
                idUsuario
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al guardar la mascota: ${errorText}`);
        }

        // Limpiar los campos del formulario después de que se haya creado la mascota
        event.target.reset();

        // Recargar la lista de mascotas y actualizar la tabla
        await mascotaService.fetchMascotas();
        mascotaService.tableMascotas('tableMascotas');

        // Mostrar un mensaje de éxito
        const nuevaMascota = await response.json();
        alert('Mascota creada:\n' + JSON.stringify(nuevaMascota));
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Función para editar el formulario de mascotas
async function editarFormularioMascota(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editIdMascota = formData.get('editIdMascota');
    const editNombreMascota = formData.get('editNombreMascota');
    const editPesoMascota = formData.get('editPesoMascota');
    const editIdUsuario = formData.get('editIdUsuario');

    try {
        const response = await fetch(`http://localhost:3000/api/mascotas/${editIdMascota}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                editIdMascota: editIdMascota,
                editNombreMascota: editNombreMascota,
                editPesoMascota: editPesoMascota,
                editIdUsuario: editIdUsuario
            })
        });

        console.log('response:', response);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al actualizar la mascota: ${errorText}`);
        }

        // Recargar la lista de mascotas y actualizar la tabla
        await mascotaService.fetchMascotas();
        mascotaService.tableMascotas('tableMascotas');

        // Mostrar un mensaje de éxito
        const nuevaMascota = await response.json();
        alert('Mascota actualizada:\n' + JSON.stringify(nuevaMascota));
        console.log('editIdMascota:', editIdMascota);
        console.log('editNombreMascota:', editNombreMascota);
        console.log('editPesoMascota:', editPesoMascota);
        console.log('editIdUsuario:', editIdUsuario);
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}


async function abrirModalEdicion(idMascota) {
    try {
        const mascota = await mascotaService.findById(idMascota);

        // Llenar el formulario del modal con los datos de la mascota
        const formEditarMascota = document.getElementById('formEditarMascota');
        formEditarMascota.querySelector('#editIdMascota').value = mascota.idMascota;
        formEditarMascota.querySelector('#editIdUsuario').value = mascota.idUsuario;
        formEditarMascota.querySelector('#editNombreMascota').value = mascota.nombreMascota;
        formEditarMascota.querySelector('#editPesoMascota').value = mascota.pesoMascota;
        // Llenar otros campos si es necesario...

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('modalEditarMascota'));
        modal.show();
    } catch (error) {
        console.error('Error al abrir el modal de edición:', error);
    }
}


// Escuchar el DOM
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await usuarioService.fetchUsuarios();
        usuarioService.mostrarListaUsuarios('selectIdUsuario');

        await mascotaService.fetchMascotas();
        mascotaService.tableMascotas('tableMascotas');
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});

// Escuchar el evento submit del formulario de mascotas
document.getElementById('frmMascotas').addEventListener('submit', enviarFormularioMascota);

// Escuchar el evento submit del formulario de mascotas editar
document.getElementById('formEditarMascota').addEventListener('submit', editarFormularioMascota);
