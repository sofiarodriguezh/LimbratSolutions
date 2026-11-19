// ---------------------------------- Seleccionar plan desde URL ------------------------------------
const parametros = new URLSearchParams(window.location.search);
const planSeleccionado = parametros.get("plan");

const selectServicio = document.getElementById("servicio");

const planes = {
    basico: "Plan Básico",
    profesional: "Plan Profesional",
    completo: "Plan Completo"
};

if (planes[planSeleccionado]) {
    selectServicio.value = planes[planSeleccionado];
}