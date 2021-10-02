

function productImage(array1, array2) {

    let htmlContentToAppend = "";

    array1.relatedProducts.forEach(element => {
            htmlContentToAppend += `

        <div class="col-lg-3 col-md-4 col-6">
            <a href="product-info.html" class="list-group-item list-group-item-action shadow-sm">
                <div class="row">
                    <div class="row-4">
                        <img class="bd-placeholder-img card-img-top" src="` + array2[element].imgSrc + `"class="img-thumbnail bd-placeholder-img card-img-top">
                    </div>
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ array2[element].name +`</h4>
                        </div>
                        <div>
                            <h6>` + array2[element].currency + array2[element].cost + `</h6>
                        </div>
                    </div>
                </div>
            </a>
        </div>
                `
        });
    
        document.getElementById("productImage").innerHTML = htmlContentToAppend;
    };


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            productPos = resultObj.data;
            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                if (resultObj.status === "ok")
                {
                    productRela = resultObj.data;
                    productImage(productPos, productRela);
                }
            })
        }
    });
});