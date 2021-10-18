const ARTICLES= "https://japdevdep.github.io/ecommerce-api/cart/654.json";


function cambiar(id, precio){

    let nuevacantidad = document.getElementById(id).value;
    document.getElementById("subtotal"+id).innerHTML = nuevacantidad * precio;


    let total = document.getElementsByName("costos");
    let costototal = 0;

    for(let i = 0; i < total.length; i++){
        costototal += parseInt(total[i].innerHTML);
    };

    document.getElementById("cartTotal").innerHTML = "UYU " + costototal;

};

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
                <td><input type="number" min="1" max="100" value = `+ cantidad +` onchange = "cambiar(this.id, `+ precio +`)" id= "cant`+ i +`"></td>
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

    document.getElementById("cartTotal").innerHTML = "UYU " + costototal;
};




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(ARTICLES).then(function(resultObj){
        
        if (resultObj.status === "ok"){
            cart = resultObj.data;
            showCart(cart.articles);
        }
    });
});