//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function Verificar() {
    let usuario = document.getElementById('user');
    let contrasena = document.getElementById('password');
    let mensaje = document.getElementById('msj');
    let Usuario ={};

    if (user.value.trim() === "" || password.value.trim() === "") {

        usuario.classList.add("Invalid");

        mensaje.innerHTML = "Dato requerido";
        mensaje.classList.add("Invalid");

        contrasena.classList.add("Invalid");
    }else {

        usuario.classList.remove("Invalid");
        contrasena.classList.remove("Invalid");

        usuario.classList.add ("Valid");
        Usuario.nombre = user.value;
        Usuario.estado = "Conectado";

        mensaje.classList.remove("Invalid");
        mensaje.classList.add("Valid");
        mensaje.innerHTML = "Conectado";

        localStorage.setItem('Usuario', JSON.stringify(Usuario));
        sessionStorage.setItem('Usuario', JSON.stringify(Usuario));

        contrasena.classList.add ("Valid")
        location.href="index.html";
    }
}