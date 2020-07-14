//Array principal del programa
var usuarios = [];
var bf = false;

//Funciones para reducir código
function getid(id) {
    return document.getElementById(id);
}

function dce(e) {
    return document.createElement(e);
}

//Clase Usuario y sus propiedades
function Usuario() {
    this.Nombre = getid("f-nombre").value;
    this.Apellido = getid("f-apellido").value;
    this.Cedula = getid("f-cedula").value;
    this.FechaNacimiento = getid("f-fn").value;
    this.Email = getid("f-email").value;
    this.Telefono = getid("f-telefono").value;
    this.Zodiaco = [Zodiaco(this.FechaNacimiento)[0], Zodiaco(this.FechaNacimiento)[1]];
}

//Crear localStorage y actualizar datos del array usuarios
function ActualizarUsuarios() {
    //Si el localStorage no existe... crearlo.
    if (localStorage.getItem("usuarios") == null) {
        localStorage.setItem("usuarios", "");
    }
    //Si el array de usuarios está vacío, después de haber eliminado la última fila, vaciar el localStorage.
    else if (usuarios.length == 0 && bf == true) {
        localStorage.setItem("usuarios", "");
        bf = false;
    }
    //Si el array de usuarios está vacío y el contenido del localStorage es vacío ("")...
    else if (usuarios.length == 0 && localStorage.getItem("usuarios") == "") {
        //No actualiza el array, pues el local storage existe, pero está vacío.
    }
    //Si el array de usuarios está vacío y el localStorage contiene información, llenar el array con los datos del LE.
    else if (usuarios.length == 0) {
        datos = localStorage.getItem("usuarios");
        usuarios = JSON.parse(datos);
    }
    //Si el array de usuarios no está vacío (si contiene datos), llevar esos datos al LE.
    else if (usuarios.length > 0) {
        datos = JSON.stringify(usuarios);
        localStorage.setItem("usuarios", datos);
    }
}

//Eventos on-click
getid("btn-agregar").onclick = function () {
    AgregarUsuario()
};
getid("btn-editar").onclick = function () {
    EditarUsuario()
};
getid("btn-reset").onclick = function () {
    LimpiarCampos()
};
getid("btn-borrarTodo").onclick = function () {
    BorrarTodo()
};
getid("btn-mostrarTodo").onclick = function () {
    MostrarTodo()
};

//Funciones de los botones y eventos on-click
function AgregarUsuario() {
    if (Validar() == true) {
        ActualizarUsuarios();
        usuarios.push(new Usuario());
        ActualizarUsuarios();
        Actualizar();
    }
}

function EditarUsuario() {
    if (getid("f-id").value == "") {
        alert("Debe seleccionar un usuario antes de editar.");
    } else {
        var indexEditar = parseInt(getid("f-id").value) - 1;

        usuarios[indexEditar].Nombre = getid("f-nombre").value;
        usuarios[indexEditar].Apellido = getid("f-apellido").value;
        usuarios[indexEditar].Cedula = getid("f-cedula").value;
        usuarios[indexEditar].FechaNacimiento = getid("f-fn").value;
        usuarios[indexEditar].Email = getid("f-email").value;
        usuarios[indexEditar].Telefono = getid("f-telefono").value;
        usuarios[indexEditar].Zodiaco = Zodiaco(usuarios[indexEditar].FechaNacimiento);

        alert("Usuario editado.");
        ActualizarUsuarios();
        Actualizar();
    }
}

function LimpiarCampos() {
    getid("f-id").value = "";
    getid("f-nombre").value = "";
    getid("f-apellido").value = "";
    getid("f-cedula").value = "";
    getid("f-fn").value = "";
    getid("f-email").value = "";
    getid("f-telefono").value = "";
}

function BorrarTodo() {
    var respuesta = confirm("¿Seguro que desea borrar todos los datos?");

    if (respuesta == true) {
        usuarios = [];
        localStorage.removeItem("usuarios");
        Actualizar();
        alert("Registros eliminados.")
    } else {
        //No hace nada, pues el usuario no desea borrar todos los datos
    }
}

function MostrarTodo() {
    if (localStorage.getItem("usuarios") == null) {
        alert("Aún no tiene usuarios registrados.");
    } else {
        ActualizarUsuarios();
        Actualizar();
    }
}

function EditarFila(fila) {
    var index = parseInt(fila.parentElement.parentElement.firstElementChild.textContent) - 1;
    var usuarioEditar = usuarios[index];

    getid("f-id").value = index + 1;
    getid("f-nombre").value = usuarioEditar.Nombre;
    getid("f-apellido").value = usuarioEditar.Apellido;
    getid("f-cedula").value = usuarioEditar.Cedula;
    getid("f-fn").value = usuarioEditar.FechaNacimiento;
    getid("f-email").value = usuarioEditar.Email;
    getid("f-telefono").value = usuarioEditar.Telefono;

    return index;
}

function EliminarFila(fila) {
    var r = confirm("¿Seguro que desea eliminar este usuario?");
    if (r == true) {
        var index = parseInt(fila.parentElement.parentElement.firstElementChild.textContent) - 1;
        if (usuarios.length == 1) {
            usuarios = [];
            bf = true;
        } else {
            usuarios.splice(index, 1);
        }
        ActualizarUsuarios();
        Actualizar();
    } else {
        //No hace nada, pues se ha decidido no borrar
    }
}

//Actualiza los datos de la tabla (visualmente) y crea los botones de cada fila
function Actualizar() {
    LimpiarCampos();

    registro = getid("tb-Datos");
    registro.innerHTML = "";

    var usuario,
        id,
        totalClientes = usuarios.length;

    for (x = 0; x < usuarios.length; x++) {
        usuario = usuarios[x];
        id = x + 1;

        tr = dce("tr");

        td = dce("td");
        td.innerHTML = id;
        tr.appendChild(td);

        td = dce("td");
        td.innerHTML = usuario.Nombre;
        tr.appendChild(td);

        td = dce("td");
        td.innerHTML = usuario.Apellido;
        tr.appendChild(td);

        td = dce("td");
        td.innerHTML = usuario.Cedula;
        tr.appendChild(td);

        td = dce("td");
        td.innerHTML = usuario.FechaNacimiento;
        tr.appendChild(td);

        td = dce("td");
        td.innerHTML = usuario.Email;
        tr.appendChild(td);

        td = dce("td");
        td.innerHTML = usuario.Telefono;
        tr.appendChild(td);

        td = dce("td");
        img = new Image(50, 50);
        img.src = usuario.Zodiaco[0];
        img.alt = usuario.Zodiaco[1];
        td.appendChild(img);
        tr.appendChild(td);

        td = dce("td");
        btnEditarFila = dce("input");
        btnEditarFila.id = "btn-editarFila"
        btnEditarFila.type = "button";
        btnEditarFila.value = "Editar";
        btnEditarFila.setAttribute("onclick", "EditarFila(this)");
        td.appendChild(btnEditarFila);

        btnEliminarFila = dce("input");
        btnEliminarFila.id = "btn-eliminarFila";
        btnEliminarFila.type = "button";
        btnEliminarFila.value = "Eliminar";
        btnEliminarFila.setAttribute("onclick", "EliminarFila(this)");
        td.appendChild(btnEliminarFila);

        tr.appendChild(td);

        registro.appendChild(tr);
    }
    getid("total-clientes").textContent = "Total: " + totalClientes + " clientes";
}

//Asignar signo Zodiacal. Recibe una fecha, la convierte a array y después a fecha para extrae el mes y el día
//Retorna la url de una imagen y su atributo alt en un array.length = 2

function Zodiaco(f) {
    var fn = f.split("/").reverse(),
        fecha = new Date(fn[0], fn[1] - 1, fn[2]),
        dia = fecha.getDate(),
        mes = fecha.getMonth() + 1;

    var img,
        alt,
        zodiaco = [];

    if ((dia >= 21 && mes == 1) || (dia <= 18 && mes == 2)) {
        img = "recursos/zodiaco/acuario.png";
        alt = "Acuario";

    } else if ((dia >= 19 && mes == 2) || (dia <= 20 && mes == 3)) {
        img = "recursos/zodiaco/piscis.png";
        alt = "Piscis";
    } else if ((dia >= 21 && mes == 3) || (dia <= 20 && mes == 4)) {
        img = "recursos/zodiaco/aries.png";
        alt = "Aries";
    } else if ((dia >= 21 && mes == 4) || (dia <= 20 && mes == 5)) {
        img = "recursos/zodiaco/tauro.png";
        alt = "Tauro";
    } else if ((dia >= 21 && mes == 5) || (dia <= 21 && mes == 6)) {
        img = "recursos/zodiaco/geminis.png";
        alt = "Geminis";
    } else if ((dia >= 22 && mes == 6) || (dia <= 22 && mes == 7)) {
        img = "recursos/zodiaco/cancer.png";
        alt = "Cancer";
    } else if ((dia >= 23 && mes == 7) || (dia <= 22 && mes == 8)) {
        img = "recursos/zodiaco/leo.png";
        alt = "Leo";
    } else if ((dia >= 23 && mes == 8) || (dia <= 22 && mes == 9)) {
        img = "recursos/zodiaco/virgo.png";
        alt = "Virgo";
    } else if ((dia >= 23 && mes == 9) || (dia <= 22 && mes == 10)) {
        img = "recursos/zodiaco/libra.png";
        alt = "Libra";
    } else if ((dia >= 23 && mes == 10) || (dia <= 22 && mes == 11)) {
        img = "recursos/zodiaco/escorpio.png";
        alt = "Escorpio";
    } else if ((dia >= 23 && mes == 11) || (dia <= 21 && mes == 12)) {
        img = "recursos/zodiaco/sagitario.png";
        alt = "Sagitario";
    } else if ((dia >= 22 && mes == 12) || (dia <= 20 && mes == 1)) {
        img = "recursos/zodiaco/capricornio.png";
        alt = "Capricornio";
    }

    return [img, alt];
}
