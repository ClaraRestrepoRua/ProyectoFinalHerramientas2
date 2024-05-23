// navbar.js
document.addEventListener("DOMContentLoaded", function () {
    cargarNavBar();
});

function cargarNavBar() {
    fetch('navBar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-section').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar la barra de navegación:', error));
}
