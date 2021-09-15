var commentsArray = [];

function score(number) {
    
    let stars ="";
    for(let i=1; i<=5; i++) {
        if(i<=number) {
            stars += '<label class="fa fa-star checked"></label>';
        }else {
            stars +='<span class="fa fa-star" style="color:#c1b8b8"></span>';
        }
    }
    return stars;
}

function showProductComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        htmlContentToAppend += `
                  <div class="list-group-item">
                      <div class="row">
                          <div class="col">
                              <div class="d-flex w-100 justify-content-between">
                                  <h4 class="mb-1">`+ comments.user +`</h4>
                                  <small class="text-muted">` + comments.dateTime + `</small>
                              </div>
                              <small class="text-muted">` + score(comments.score) + `</small>
                              <p class="mb-1">`+ comments.description +`</p>
                          </div>
                      </div>
                  </div>
                  `
                  document.getElementById("prod-comments").innerHTML = htmlContentToAppend;
            }
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){

        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data;
            showProductComments(commentsArray);
        }
    });
});