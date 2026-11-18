//----------------------------------Seleccionar plan desde URL------------------------------------
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
//----------------------------------Formulario de contacto------------------------------------
const WEB3FORMS_KEY = 'be6b0a3d-c10a-46e7-9421-b12fb56b9517';

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", async function (event) {
    event.preventDefault();
    const error = document.getElementById("errorFormulario");
    const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        servicio: document.getElementById("servicio").value,
        mensaje: document.getElementById("mensaje").value.trim(),
        privacidad: document.getElementById("privacidad").checked
    };

    const formatoNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/;
    const formatoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formatoNombre.test(datos.nombre)) {
        error.textContent = "Introduce tu nombre y apellidos.";
        return;
    }
    if (!formatoEmail.test(datos.email)) {
        error.textContent = "Introduce un correo electrónico válido.";
        return;
    }
    if (!datos.servicio || datos.servicio === "0") {
        error.textContent = "Selecciona un servicio.";
        return;
    }
    if (!datos.mensaje) {
        error.textContent = "Introduce un mensaje.";
        return;
    }
    if (!datos.privacidad) {
        error.textContent = "Debes aceptar la política de privacidad.";
        return;
    }

    const formularioWeb = {
        access_key: WEB3FORMS_KEY,
        subject: "Nueva consulta",
        from_name: "Limbrat Solutions",
        name: datos.nombre,
        email: datos.email,
        servicio: datos.servicio,
        message: datos.mensaje
    };

    try {
        const respuesta = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formularioWeb)
        });

        const resultado = await respuesta.json();
        if (respuesta.ok && resultado.success) {
            error.style.color = "green";
            error.textContent = "Mensaje enviado correctamente";
            formulario.reset();
        } 
        else {
            error.textContent = resultado.message || "No se ha podido enviar el mensaje.";
            console.error("Error de Web3Forms:", resultado);
        }
    } 
    catch (e) {
        console.error("Error de conexión:", e);
        error.textContent = "Error al conectar con el servicio de envío.";
    }
});
