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
                idUsuario // Agregar el ID del usuario seleccionado al cuerpo de la solicitud
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al guardar la mascota: ${errorText}`);
        }

        const nuevaMascota = await response.json();
        alert('Mascota creada:\n' + JSON.stringify(nuevaMascota));
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Escuchar el evento submit del formulario de mascotas
document.getElementById('frmMascotas').addEventListener('submit', enviarFormularioMascota);
