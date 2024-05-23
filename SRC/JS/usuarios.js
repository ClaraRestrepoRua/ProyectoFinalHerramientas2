// Función para enviar el formulario de usuarios
async function enviarFormularioUsuario(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nombreUsuario = formData.get('nombreUsuario');
    const apellidoUsuario = formData.get('apellidoUsuario');
    const telefonoUsuario = formData.get('telefonoUsuario');

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreUsuario,
                apellidoUsuario,
                telefonoUsuario
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al guardar el usuario: ${errorText}`);
        }

        const nuevoUsuario = await response.json();
        alert('Usuario creado:\n' + JSON.stringify(nuevoUsuario));
    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// Escuchar el evento submit del formulario de usuarios
document.getElementById('frmUsuarios').addEventListener('submit', enviarFormularioUsuario);


