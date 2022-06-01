var configuracionesCategorySheer = {
    init : function() {
        this.callVitrineSheer();
    },
    callVitrineSheer: function () {
        var nameSheer = document.querySelectorAll(".product-name");
        var productNames = [];
        nameSheer.forEach(function(name, index){
          var textName = name.innerText;
          productNames.push(textName)
        })
        productNames = [...new Set(productNames)];

        productNames.forEach(function(productName, index){
          var products = [];
          nameSheer.forEach(function(name, index){
            if(name.innerText === productName) {
              products.push(name.parentElement.parentElement)
            }
          })
          products = products.sort(function(a, b) {
            const priceA = parseInt(a.firstElementChild.children[7].firstElementChild.lastElementChild.firstElementChild.innerText.replace("$", "").replace(".", "").replace(",",""));
            const priceB = parseInt(b.firstElementChild.children[7].firstElementChild.lastElementChild.firstElementChild.innerText.replace("$", "").replace(".", "").replace(",",""));
            return priceA - priceB
          })
          products.forEach(function(product, index) {
            if(index != 0) {
              product.remove();
            }
          })
        })
    }
}
$( document ).ready(function() {
    setTimeout(function(){
        document.querySelector("#cargarproducto").click();
    }, 100)   
	configuracionesCategorySheer.init();
}); 