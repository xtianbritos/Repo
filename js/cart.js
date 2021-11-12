const ARTICLES= "https://japdevdep.github.io/ecommerce-api/cart/654.json";

let precioSubtotal = 0;
let envioPorcentaje = 15;
let envioCosto = 0;
let seleccion = "Tarjeta de crédito";



//función que escribe el tipo de pago seleccionado
function tipoPago(){
    document.getElementById("seleccionado").innerHTML = "<strong>"+ seleccion +"</strong><button type='button' class='m-1 btn btn-link' data-toggle='modal' data-target='#exampleModal'>Cambiar</button>";
    
    let formaPago = document.getElementsByName("formaPago");
    let select = document.getElementById("seleccionado");

    select.classList.remove('is-invalid');
    select.classList.add('is-valid');

    formaPago[0].value=1;
    formaPago[1].value=1;
};


//Función para calcular el subtotal al cambiar la cantidad de articulos
function cambiar(id, precio){

    let nuevacantidad = document.getElementById(id).value;
    document.getElementById("subtotal"+id).innerHTML = nuevacantidad * precio;


    let total = document.getElementsByName("costos");
    let costosubtotal = 0;

    for(let i = 0; i < total.length; i++){
        costosubtotal += parseInt(total[i].innerHTML);
    };

    precioSubtotal = costosubtotal;
    sumarEnvio();
    calcularTotal();

    document.getElementById("cartSubtotal").innerHTML = "UYU " + costosubtotal;
};


//funcion que calcula envio al seleccionar un tipo
function sumarEnvio(){
    
    envioCosto = (precioSubtotal*envioPorcentaje)/ 100;
    calcularTotal();

    document.getElementById("costoEnvio").innerHTML = "UYU " + envioCosto;
};


//función para calcular el costo total
function calcularTotal(){

    let total = envioCosto + precioSubtotal;

    document.getElementById("cartTotal").innerHTML = "UYU " + total;
};


//función para mostrar el carrito
function showCart(array){

    let htmlContentToAppend = `
    
    <table style="border: hidden" class="table">

    <tbody>
      <tr>
        <td><b>Imagen</b></td>
        <td><b>Nombre</b></td>
        <td><b>Costo</b></td>
        <td><b>Cantidad</b></td>
        <td><b>Subtotal</b></td>
      </tr>
      `
    
    for(let i = 0; i < array.length; i++){
        let articles = array[i];

        let moneda = articles.currency;
        let precio = articles.unitCost;
        let cantidad = articles.count;

        if (moneda === "USD"){
            moneda = "UYU";
            precio *= 40;
        };
        
        htmlContentToAppend += `    
            <tr>
                <td><img src=" `+ articles.src +` " width="100" class="img-thumbnail"></td>
                <td> `+ articles.name +` </td>
                <td> `+ articles.currency +` `+ articles.unitCost +` </td>
                <td><input type="number" class="form-control" min="1" max="100" value = `+ cantidad +` onchange = "cambiar(this.id, `+ precio +`)" id= "cant`+ i +`"></td>
                <td><b> `+ moneda +` </b> <b name = "costos" id= "subtotalcant`+ i +`"> `+ precio * cantidad +` </b></td>
            </tr>`

    };

    htmlContentToAppend += `
            </tbody>
        
        </table>`
        
    document.getElementById("cartArticles").innerHTML = htmlContentToAppend;


    let total = document.getElementsByName("costos");
    let costototal = 0;

    for(let i = 0; i < total.length; i++){
        costototal += parseInt(total[i].innerHTML);
    };

    precioSubtotal = costototal;

    document.getElementById("cartSubtotal").innerHTML = "UYU " + costototal;
    document.getElementById("cartTotal").innerHTML = "UYU " + costototal;
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    //Event Listener que cambia la variable envioPorcentaje cuando se selecciona un radio de los tipos de envios..
    document.getElementById("premiumradio").addEventListener("change", function(){
        envioPorcentaje = 15;
        sumarEnvio();
    });
    
    document.getElementById("expressradio").addEventListener("change", function(){
        envioPorcentaje = 7;
        sumarEnvio();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        envioPorcentaje = 5;
        sumarEnvio();
    });

    //Event Listener que cambia la variable seleccion cuando se selecciona un radio del modal.
    document.getElementById("tarjetaradio").addEventListener("change", function(){
        seleccion = "Tarjeta de crédito";
    });

    document.getElementById("bancoradio").addEventListener("change", function(){
        seleccion = "Transferencia Bancaria";
    });


    getJSONData(ARTICLES).then(function(resultObj){
        
        if (resultObj.status === "ok"){
            cart = resultObj.data;
            showCart(cart.articles);
        }
        sumarEnvio();
    });


    //Se obtiene el formulario de compra de producto
    let cartForm = document.getElementById("cart-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Comprar'.
    cartForm.addEventListener("submit", function(e){

        let variable = document.getElementsByName("envio");
        let infoMissing = false;

        for (let i=0; i<variable.length; i++){
            if(variable[i].value === ""){
                variable[i].classList.add('is-invalid');
                infoMissing = true;
            }
            else{
                variable[i].classList.remove('is-invalid');
                variable[i].classList.add('is-valid');
            }
        }

        let pais = document.getElementById("pais");

        if (pais.value === ""){
            pais.classList.add('is-invalid');
            infoMissing = true;
        }
        else{
            pais.classList.remove('is-invalid');
            pais.classList.add('is-valid');
        }

        let formaPago = document.getElementsByName("formaPago");
        let select = document.getElementById("seleccionado");

        if  (formaPago[0].value==="" || formaPago[1].value===""){
            select.classList.add('is-invalid');
            infoMissing = true;
            document.getElementById("seleccionado").innerHTML = "<p id='seleccionado' style='color: #dc3545;'> No se ha seleccionado <button type='button' class='m-1 btn btn-link' data-toggle='modal' data-target='#exampleModal'>Seleccionar</button></p>";
        }

        
        if(!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para comprar.

            getJSONData(PUBLISH_PRODUCT_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = "¡Tu compra se realizó con éxito!";
                    document.getElementById("alertResult").classList.add('alert-success');
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                    document.getElementById("alertResult").classList.add('alert-danger');
                }
    
                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertResult").classList.add("show");
            });
        }

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
        return false;

    });

});


