const enlaces = document.querySelectorAll('.paginas a');
const paginaActual = window.location.pathname.split('/').pop().toLowerCase();
enlaces.forEach(enlace => {
    const paginaEnlace = new URL(enlace.href).pathname.split('/').pop().toLowerCase();
    if (paginaEnlace === paginaActual) {
        enlace.classList.add('activo');
    } 
    else {
        enlace.classList.remove('activo');
    }
});