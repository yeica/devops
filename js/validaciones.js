//Expresiones regulares para validaciones.

var reNumeros = /^[0-9]+$/,
    reFechas = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
    reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Validación de datos recibidos.

function Validar() {

    var nombre = getid("f-nombre").value,
        apellido = getid("f-apellido").value,
        cedula = getid("f-cedula").value,
        fechaNacimiento = getid("f-fn").value,
        email = getid("f-email").value,
        telefono = getid("f-telefono").value;

    if (nombre == "" || apellido == "" || cedula == "" || fechaNacimiento == "" || email == "" || telefono == "") {
        alert("Por favor, llene todos los campos.")
    } else if (!cedula.match(reNumeros)) {
        alert("Los valores de la cédula deben ser numéricos.")
    } else if (!fechaNacimiento.match(reFechas)) {
        alert("Digite una fecha de nacimiento válida (dd/mm/yyyy).")
    } else if (!telefono.match(reNumeros)) {
        alert("Digite un número de teléfono válido.")
    } else if (!email.match(reEmail)) {
        alert("Digite un correo válido.")
    } else {
        alert("Usuario agregado con éxito.")
        return true;
    }
}
