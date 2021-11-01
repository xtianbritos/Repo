function imagenb64() {
  
    if (this.files && this.files[0]) {
      let FR= new FileReader();
      
      FR.addEventListener("load", function(e) {
        document.getElementById("b64").innerHTML = e.target.result;
      }); 
      
      FR.readAsDataURL( this.files[0] );
    }
    
  };
  

  document.getElementById("photo").addEventListener("change", imagenb64);


function Verificar() {

    let nombres = document.getElementById('names');
    let apellidos = document.getElementById('lastnames');
    let edad = document.getElementById('age');
    let email = document.getElementById('mail');
    let telefono = document.getElementById('phone');
    let mensaje = document.getElementById('msj');
    let imagen = document.getElementById('b64');


    let Perfil ={};

    if (names.value.trim() === "" || lastnames.value.trim() === "" || b64.innerHTML.trim() === "" || age.value.trim() === "" || mail.value.trim() === "" || phone.value.trim() === "") {

        mensaje.classList.add("Invalid");
        mensaje.innerHTML = "Datos requeridos";

    }else {

        Perfil.nombres = names.value;
        Perfil.apellidos = lastnames.value;
        Perfil.edad = age.value;
        Perfil.email = mail.value;
        Perfil.telefono = phone.value;
        Perfil.imagen = b64.innerHTML;

        mensaje.classList.remove("Invalid");
        mensaje.classList.add("Valid");
        mensaje.innerHTML = "Datos guardados";

        localStorage.setItem('Perfil', JSON.stringify(Perfil));
        
        location.href= "my-profile.html";
        
    }
};


function Guardar() {

    let mensaje = document.getElementById('msj');
  
    let Perfil ={};

    Perfil.nombres = names.value;
    Perfil.apellidos = lastnames.value;
    Perfil.edad = age.value;
    Perfil.email = mail.value;
    Perfil.telefono = phone.value;
    Perfil.imagen = b64.innerHTML;

    Usuario= JSON.parse(localStorage.getItem("Usuario"));
    Usuario.nombre = username.value;

    mensaje.classList.add("Valid");
    mensaje.innerHTML = "Datos guardados";

    localStorage.setItem('Perfil', JSON.stringify(Perfil));
    localStorage.setItem('Usuario', JSON.stringify(Usuario));
        
    location.href= "my-profile.html";
        
};

function Mostrar() {
    
    document.getElementById("elperfil").innerHTML = "<div class='col-md-8 order-md-1'><br> <div class='list-group-item'><p>Imagen de perfil:</p><img src='' id='image' style='max-width:100%;height:200;'></div><div class='list-group-item'><label> Usuario: <input class='form-control' id='username' type='text' disabled></label><br><br><label> Nombres: <input class='form-control' id='names' type='text' disabled></label><br><br><label> Apellidos: <input class='form-control' id='lastnames' type='text' disabled></label><br><br><label> Edad: <input class='form-control' id='age' type='number' disabled></label><br><br><label> E-mail: <input class='form-control' id='mail' type='email' disabled></label><br><br><label> Teléfono: <input class='form-control' id='phone' type='tel' disabled></label><br><br><span id='msj'></span></div><br><button class='btn btn-secondary' type='button' onclick='Editar()'>Editar</button><br><br></div>";

    miPerfil = JSON.parse(localStorage.getItem("Perfil"));
    miUsuario = JSON.parse(localStorage.getItem("Usuario"));

    document.getElementById("names").value = miPerfil.nombres;
    document.getElementById("lastnames").value = miPerfil.apellidos;
    document.getElementById("age").value = miPerfil.edad;
    document.getElementById("mail").value = miPerfil.email;
    document.getElementById("phone").value = miPerfil.telefono;
    document.getElementById("image").src = miPerfil.imagen;
    document.getElementById("username").value = miUsuario.nombre;
};


function Editar() {

    document.getElementById("elperfil").innerHTML = "<div class='col-md-8 order-md-1'><h4>Editar perfil</h4><br><div class='list-group-item'><p>Imagen de perfil:</p><input type='file' id='photo'><p Style='Display:none' id='b64'></p> <br> </div><div class='list-group-item'><label>Usuario: <input class='form-control' id='username' type='text'></label><br><br><label>Nombres: <input class='form-control' id='names' type='text'></label><br><br><label> Apellidos: <input class='form-control' id='lastnames' type='text'></label><br><br><label> Edad: <input class='form-control' id='age' type='number'></label><br><br><label> E-mail: <input class='form-control' id='mail' type='email'></label><br><br><label> Teléfono: <input class='form-control' id='phone' type='tel'></label><br><br><span id='msj'></span></div><br><button class='btn btn-primary' type='button' onclick='Guardar()'>Guardar</button><br><br></div>";

    miPerfil = JSON.parse(localStorage.getItem("Perfil"));
    miUsuario = JSON.parse(localStorage.getItem("Usuario"));

    document.getElementById("names").value = miPerfil.nombres;
    document.getElementById("lastnames").value = miPerfil.apellidos;
    document.getElementById("age").value = miPerfil.edad;
    document.getElementById("mail").value = miPerfil.email;
    document.getElementById("phone").value = miPerfil.telefono;
    document.getElementById("b64").innerHTML = miPerfil.imagen;
    document.getElementById("username").value = miUsuario.nombre;

    document.getElementById("photo").addEventListener("change", imagenb64);
  
};



document.addEventListener("DOMContentLoaded", function(e){
    if (JSON.parse(localStorage.getItem("Perfil") !== null)) {
        
        Mostrar();
      
    };
});
