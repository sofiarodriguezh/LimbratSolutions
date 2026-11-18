
const imagenes = document.querySelectorAll('.carrusel-imagenes img');
const anterior = document.querySelector('.anterior');
const siguiente = document.querySelector('.siguiente');
const indicadores = document.querySelectorAll('.indicadores span');
let indice = 0;

function mostrarImagen(n) {
    imagenes.forEach(img => img.classList.remove('activa'));
    indicadores.forEach(ind => ind.classList.remove('activo'));
    indice = (n + imagenes.length) % imagenes.length;
    imagenes[indice].classList.add('activa');
    indicadores[indice].classList.add('activo');
}

siguiente.addEventListener('click', () => {
    mostrarImagen(indice + 1);
});

anterior.addEventListener('click', () => {
    mostrarImagen(indice - 1);
});

indicadores.forEach((indicador, i) => {
    indicador.addEventListener('click', () => {
        mostrarImagen(i);
    });
});

setInterval(() => {
    mostrarImagen(indice + 1);
}, 8000);
