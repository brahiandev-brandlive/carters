jQuery(document).ready(function () {
    COLORSWATCHES.init();
  });
  
  var COLORSWATCHES = {
    init: function () {
      jQuery(document).on("ajaxStop", function () {
        COLORSWATCHES.callVitrine();
      });
      jQuery(window).load(function () {
        setTimeout(function () {
          COLORSWATCHES.callVitrine();
        }, 1000);
      });
    },
  
    callVitrine: function () {
      $(".prateleira.vitrine ul li").not('.noStock').not('.product-field ul li').not('.product-variation li').not('.swatches-loaded').each(function () {
        _this = $(this);
  
        if ($(this).find(".similar-colors-vitrine .product-variation li").length == 0 && !$(this).hasClass("swatches-loaded")) {
          COLORSWATCHES.getProductVariations(".prateleira.vitrine ul", _this);
        }

        COLORSWATCHES.getRatingMasterData(".prateleira.vitrine ul", _this)
        //add call para paginacao
        _this.addClass("swatches-loaded");
      });
    },
    getProductVariations: function (vitrine_html_element, html_child_element) {
      //$(".prateleira.vitrine ul").removeClass("owl-carousel owl-theme");
      $(".prateleira.vitrine ul li.helperComplement").length > 0 && $(".helperComplement").remove(), null == vitrine_html_element && (vitrine_html_element = ".vitrine"), null == html_child_element && (html_child_element = ".prateleira.vitrine > ul > li").not('.swatches-loaded'), $(vitrine_html_element).find(html_child_element).each(function () {
        if ($(this).find(".similar-colors-vitrine").length > 0) {
          try {
            var $product_element_object, product_id, product_link;
            $product_element_object = $(this);
            product_id = $product_element_object.find("#productID-oculto").text();
            product_sku = $product_element_object.find("#skuID-oculto").text();
            product_link = $product_element_object.find("#linkID-oculto").text();
            product_link = product_link.replace("https://tuissco.myvtex.com/", "").replace("https://tuissco.vtexlocal.com.br/", "").replace("http://tuissco.vtexcommercestable.com.br/", "");
            //product_id = parseInt(product_id);
            if (product_link) {
              //Pickers
              apiurl = '/api/catalog_system/pub/products/search/?fq=productId:' + product_id;
              //console.log(product_id);
              $.ajax({
                url: apiurl,
                error: function (jqXHR, textStatus, errorThrown) { 
                },
                success: function (data, textStatus, jqXHR) {
                  var $container_variation, before, i, main_thumb_src, sku, sku_thumb, skus, linkVariation;
                  $product_element_object.addClass('swatches-loaded');
                  if(data.length >= 1){
                    if (data[0].items != null && data[0].items != void(0) && data[0].items.length > 0) {
                      skus = data[0].items;
                      linkVariation = data[0].link;
                      //console.log(skus); 
    
                      //begin for
                      var count = 0;
                      //skus.length
                      for (var i = 0; i < skus.length; i++) {
                        count++;
                        //console.log(skus); 
                        before = i - 1;
                        $container_variation = $product_element_object.find(".product-variation");
                        if (skus[i].Color !== null && skus[i].Color !== undefined && skus[i].Color.length > 0 && skus[i].Color[0].length > 0 ) {
    
                          if (0 === i || skus[i].Color[0] !== skus[before].Color[0] && $container_variation.find('li[data-sku-color="' + skus[i].Color[0] + '"]').length < 1) {
                            //Si es el primer sku o es distinto color al anterior.
                            sku = skus[i].itemId;
    
                            color = skus[i].Color[0];
                            //console.log("skus[i].Color[0]: "+ skus[i].Color[0]); 

                            //Determina si el picker tiene imagen o color
                            var colorBgStyle; 
                            if(color.includes('.png') || color.includes('.jpg')) {                              
                              colorBgStyle = 'background: url(';
                              colorBgStyle += '/arquivos/'+ color;
                              colorBgStyle += ')';
                            } else {
                              colorBgStyle = 'background-color:' + color;
                            }
    
                            prodvariation_img = skus[i].images[0].imageUrl; //busca la imagen por sku.jpg
                            if (skus[i].images.length > 1) {
                              prodvariation_img_atras = skus[i].images[1].imageUrl; //busca la imagen por sku.jpg
                            } else {
                              prodvariation_img_atras = "";
                            }
                            color_img = "/arquivos/" + color.replace(" ", "").toLowerCase() + '.jpg'; //busca la imagen por color.jpg
    
    
                            if (prodvariation_img == '') {
                              return;
                            };
    
                            //forma la url de la imagen. Setear segun sku_variation o variacion_color.
                            $container_variation = $('<div class="product-variation"></div>');
                            
    
                            if (jQuery($product_element_object).find(".product-variation").length == 0) {
                              jQuery($container_variation).appendTo($product_element_object.find(".similar-colors-vitrine"));
                            }

                            var cuenta = jQuery($product_element_object).find(".product-variation li").length;
                            if (cuenta < 5) {
                              jQuery($product_element_object).find(".product-variation").append('<li id="variacao-item-' + sku + '" data-sku-color="' + color + '" data-sku-thumb=' + prodvariation_img.replace(skus[i].images[0].imageId, skus[i].images[0].imageId + "-238-238") + ' data-sku-thumb_atras=' + prodvariation_img_atras.replace(skus[i].images[0].imageId, skus[i].images[0].imageId + "-238-238")+'> <a href="'+ linkVariation +'"class="wrap-image" style="' + colorBgStyle + '"></a></li>'),
                              main_thumb_src = $product_element_object.find(".productImage .imagen-prod > img").attr("src");                              
                            }
                            if(cuenta == 5) {
                              jQuery($product_element_object).find(".product-variation").append('<li> <div class="wrap-more"><a href="' + data[0].link + '"> + </a> </div> </li>');
                            }  

                            $("li#variacao-item-" + sku).click(function () {
                              //console.log("hice clock");
                              $('.product-variation li').removeClass('selected');
                              $(this).addClass('selected');
    
                              var selected_color = jQuery(this).attr('data-sku-color').replace('"', '');
                              var product_href = $product_element_object.find("#container-img .productImage").attr('href');
                              //console.log("pruebas: "+product_href);
                              //console.log("pruebas: "+product_href);
                              //var color_before = product_href.substr(product_href.indexOf("?") + 1);
                              //var nocolor_href = $product_element_object.find("#container-img .productImage").attr('href').replace('?' + color_before, '');
                              //var hrefandcolor = nocolor_href + '?color=' + selected_color;
                              //$product_element_object.find("#container-img .productImage").attr('href', hrefandcolor);
                              //$product_element_object.find("#container-img .productImage > img").attr("src", $(this).attr("data-sku-thumb"));
                              //$product_element_object.find(".atras").attr('href', hrefandcolor);
                              //$product_element_object.find(".atras > img").attr("src", $(this).attr("data-sku-thumb_atras"));
    
                            });
                          }
                        } 
                      }
                      /* if(count < 4){
                          $container_variation = $product_element_object.find(".product-variation");
                          jQuery($product_element_object).find(".product-variation").append('<li> <div class="wrap-image"><a href="' + data[0].link + '"> + </a> </div> </li>');
                        
                      } */
                      //end for
                      
                    } else {
                      console.log("No hay item");
                    }
                  }
                  
                  //end if
                },
              });
            }
  
          } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
          }
        }
      });
    },

    //Acá se llama las estrellas de cada producto -Rating-
    getRatingMasterData: function(vitrine_html_element, html_child_element) {
      //$(".prateleira.vitrine ul").removeClass("owl-carousel owl-theme");
      $(".prateleira.vitrine ul li.helperComplement").length > 0 && $(".helperComplement").remove(), null == vitrine_html_element && (vitrine_html_element = ".vitrine"), null == html_child_element && (html_child_element = ".prateleira.vitrine > ul > li").not('.swatches-loaded'), $(vitrine_html_element).find(html_child_element).each(function () {
        var $product_element_object, productID;
        $product_element_object = $(this);
        productID = $product_element_object.find("#productID-oculto").text();
        var stars = [];
        $.ajax({
            url: '/api/dataentities/PA/search?_fields=assessment,productID,approved&productID=*' + productID +'*',
            type: 'GET',
            success: function(data){               
                if(data.length > 0) {
                    $.each(data, function(key, value){
                        if(value.approved == true) {
                            stars.push(value.assessment);
                        }                      
                    })
                    if(stars.length > 0) {
                      setTimeout(function(){
                        COLORSWATCHES.quantityStarsCategory(stars, $product_element_object);
                      },200)  
                    }                                 
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                datos = undefined;
            },
            cache: false
        });
      })
    },
    //Cantidad y promedio
    quantityStarsCategory: function(stars, element) {
      element.find('#spnRatingProdutoCategory').text('(' + stars.length + ')');     
      var values = stars;
      var sum = values.reduce((previous, current) => current += previous);
      var avg = sum / values.length;
      element.find('#spnRatingProdutoCategory').addClass('stars' + Math.floor(avg));
      element.find('.link-ancora').css("display", "block");
    },
  }