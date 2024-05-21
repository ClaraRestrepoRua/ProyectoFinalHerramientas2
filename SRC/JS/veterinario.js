document.getElementById('frmVeterinario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nombreVeterinario = formData.get('nombreVeterinario');
    const apellidoVeterinario = formData.get('apellidoVeterinario');
    const telefonoVeterinario = formData.get('telefonoVeterinario');

    try {
        const response = await fetch('http://localhost:3000/api/veterinarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreVeterinario: nombreVeterinario,
                apellidoVeterinario: apellidoVeterinario,
                telefonoVeterinario: telefonoVeterinario
            })
        });

        if (!response.ok) {
            const errorText = await response.text(); // Obtener el mensaje de error del servidor
            throw new Error(`Error al guardar el veterinario: ${errorText}`);
        }

        const nuevoVeterinario = await response.json();
        // Mostrar la respuesta en una alerta
        alert('Veterinario creado:\n' + JSON.stringify(nuevoVeterinario));
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
        // Aquí podrías mostrar un mensaje de error al usuario
    }
});
