let categoriesArray = [];

function showCategoriesList(array){

  let htmlContentToAppend = "";
  for(let i = 0; i < array.length; i++){
      let categories = array[i];

      htmlContentToAppend += `
      <div class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3">
                  <img src="` + categories.imgSrc + `" alt="` + categories.description + `" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">`+ categories.name +`</h4>
                      <small class="text-muted">` + categories.soldCount + ` artículos</small>
                  </div>
                      <p class="mb-1">`+ categories.description +`</p>
              </div>
          </div>
      </div>
      `
      document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
  }
  
  
  //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  getJSONData(PRODUCTS_URL).then(function(resultObj){

      if (resultObj.status === "ok") {
          categoriesArray = resultObj.data;
          //Muestro las categorías ordenadas
          showCategoriesList(categoriesArray);
          c
      }
    })
  })
}