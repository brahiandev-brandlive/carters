

var configuracionesGenerales = {
    init : function(){
        var width = screen.width;
        this.hiddenPrice();
        this.goToHome();
        this.saveDataNewsletter();
        this.formularioContacto();
        this.shareLinkPlp();
        this.textureProduct();
        this.carrusel();
        this.openFAQ();
        this.unidadMultiplicadora();     
        this.stickyHeader();      
        this.cantidadMinicart();
        if(width < 767){
            this.openMobileSearch();
            this.openMobileFooter();
            this.removeFixedHeader();
        }
    },
    hiddenPrice: function() {
        var category = document.querySelectorAll(".product-name-short");
        category.forEach(function(categoryMotorizada, index){
            if(categoryMotorizada.innerText.toLowerCase().includes("motorizadas")) {
                categoryMotorizada.parentElement.parentElement.querySelector(".price").style.display = "none";
            }
        })
    },
    //this function is to close popuplogin
    goToHome: function () {
        jQuery(window).load(function () {
          jQuery('#login-page .modal-header .vtexIdUI-close').on('click', function () {
            window.location = '/';
          });
        });
    }, 
    //Cantidad minicart
    cantidadMinicart: function() {
        vtexjs.checkout.getOrderForm().then(function(res){
            var acum = 0;
            for(var i=0; i<res.items.length; i++) {
                if(!res.items[i].productCategories[2]) {
                    var cantidad = Number(res.items[i].attachments[0].content.Cantidad);
                    acum += cantidad;
                }
            }
            $(".btn-mini-cart .mini-cart-cantidad")[0].innerHTML = acum;
            $(".btn-mini-cart .mini-cart-cantidad")[1].innerHTML = acum;
        })
    },
    //menu fixed
    stickyHeader: function () {
        //Mobile Setup  Logic
        var mobileBreakpoint = 991;
        var isMobile;
        isMobile = (window.innerWidth <= mobileBreakpoint) ? true : false;
        if (!isMobile) {
    
          function _setStickyifScrollTop() {
            jQuery(document).ready(function () {
              var st = jQuery(window).scrollTop();
              if (st > 90) {
                jQuery('.header-container').removeClass('sticky');
                jQuery('.header-container').addClass('sticky');
              } else {
                jQuery('.header-container').removeClass('sticky');
              }
            });
          }
          _setStickyifScrollTop();
    
          function _setScrollUpDown() {
            var lastScrollTop = 0;
            jQuery(window).scroll(function (event) {
              var st = jQuery(this).scrollTop();
              if (st > 90) {
                jQuery('.header-container').addClass('sticky');
                if (st > lastScrollTop) {
                  // downscroll code
                  jQuery('body').removeClass('scrollUp');
                } else {
                  jQuery('body').addClass('scrollUp');
                }
                lastScrollTop = st;
              } else {
                jQuery('.header-container').removeClass('sticky');
              }
            });
          }
          _setScrollUpDown();
        }
      },       
    openMobileSearch : function(){
        $('.button-search').click(function(){
            if($('.search').hasClass('activeSearch')){
                $('.search').removeClass('activeSearch');
            } else {
                $('.search').addClass('activeSearch');
            }
            
        });
        $('.container-close-search').click(function(){
            $('.search').removeClass('activeSearch');            
        })
    },
    openMobileFooter : function(){
        $('.withdrop-item').on('click','h3', function(e){
            $(this).next('ul').toggle();
            if($('h3').hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            } 
        })
    },
    removeFixedHeader : function(){
        $('.button-menu-xs').on('click','.btn-open-menu-xs', function(e){
            e.preventDefault();
            $(".page").addClass('visible-menu');
            $(".header-container").css("position", "initial");
        })
        $('.container-close-menu').on('click','.close-menu', function(e){
            e.preventDefault();
            $(".page").removeClass('visible-menu')
            $(".header-container").css("position", "fixed");
        })
    },
    saveDataNewsletter : function(){
        $('#newsletter').on('submit',function(e){
            e.preventDefault();
            var email = $('#email').val();
            var optIn = $('#isNewsletterOptIn').val();
            var datosToSave = {
                'email': email,
                'isNewsletterOptIn': optIn
              }
            $.ajax({
                url:'/api/dataentities/CL/documents' ,
                data: JSON.stringify(datosToSave),
                contentType : 'application/json; charset=utf-8',
                type: 'POST',
                success : function(data){
                  console.log('success')
                  $('.formulario').fadeOut();
                  $('#message').fadeIn();
                  $('#message').empty().append('<h3>¡GRACIAS POR SUSCRIBIRTE!</3>');
                },
                error : function(error){
                    console.log(error.responseText)
                    if(error.status == 400){
                        var response = JSON.parse(error.responseText);
                        $('#message').fadeIn();
                        if(response.Message == 'duplicated entry'){
                            $('#message').empty().append('<p>Ya te encuentras registrado.</p>');
                        }else{
                            $('#message').empty().append('<p>Lo sentimos, ha ocurrido un error, puede que ya estés registrado o inténtalo más tarde.</p>');
                        }
                        setTimeout(function(){
                            $('#message').fadeOut();
                        },5000)
                    }
                }
              })
        })
    },    
    shareLinkPlp : function(){
        var productitem = document.querySelectorAll(".productItem__image .share");
        for(var i = 0; i<productitem.length; i++){
            productitem[i].addEventListener("click", function(e) {
                e.target.parentElement.lastElementChild.classList.toggle("show");
            });
        };
        var shareLinksA = $(".BtnShare a");
        $(shareLinksA).each(function() {
            sharehref = $(this).attr("href"),
            url = $(this)[0].parentElement.parentElement.parentElement.children[3].getAttribute("href"),
            toshareurl = sharehref + url,
            $(this).attr("href", toshareurl)
        });
        $('.link').each(function(){
            $(this).on("click", function(){
                value = $(this).text(); 
                var $temp = $("<input>");
                  $("body").append($temp);
                  $temp.val(value).select();
                  document.execCommand("copy");
                  $temp.remove();
            })
        })
    },
    textureProduct : function(){
        $('.product-texture li').each(function(){
            if ($(this).length) {
                $(this).css('background','url('+$(this).text()+')');
            }
        });
    },
    carrusel : function(){
        if( $.fn.owlCarousel ){
            var $showCaseOwl = $(".showcase-carrusel .prateleira > ul");
            if( $showCaseOwl.length ){
                $showCaseOwl.find('.helperComplement').remove();
                $showCaseOwl.owlCarousel({
                    items 				: 5,
                    autoPlay 			: true,
                    stopOnHover 		: true,
                    pagination 	 		: true,
                    itemsDesktop 		: [1199,5],
                    itemsDesktopSmall 	: [980,5],
                    itemsTablet 		: [768,3],
                    itemsMobile 		: [479,2],
                    navigation : false,
                });
            }
        }
    },
    //Formualrio de Contacto Conexcion
    formularioContacto : function(){
        $('#contactos').on('submit',function(e){
            e.preventDefault();

            var apellidos = $('.input-regla_apellido').val();
            var descripcion = $('.input-numero_comentario').val();
            var email = $('.input-regla_mail').val();
            var nombre = $('.input-regla_nombre').val();
          /*   var numerodoc = $('.input-numero_documento').val(); */
            var telefono = $('.input-regla_telefono').val();
            var terminos = $('.input-regla_box').prop('checked');
           /*  var tipodoc = $('.input-regla_tipo_documento').val(); */
            var tiposolicitud = $('.input-regla_tipo_solicitud').val();


        

            var datosToSave = {

                "apellidos": apellidos,
                "descripcion": descripcion,
                "email":email,
                "nombre":nombre,
              /*   "numerodoc":numerodoc, */
                "telefono":telefono,
                "terminos":terminos,
               /*  "tipodoc":tipodoc, */
                "tiposolicitud":tiposolicitud

            }
            $.ajax({
                url:'/api/dataentities/SD/documents' ,
                data: JSON.stringify(datosToSave),
                contentType : 'application/json; charset=utf-8',
                type: 'POST',
                success : function(data){
                console.log('success')
                    
                $('.mensaje').fadeIn();
                $('.mensaje').empty().append('<h3>¡Gracias por contactarnos!</3>');
                setTimeout(function(){
                    $('.mensaje').fadeOut();
                    location.reload(true);
                },5000)
                },
                error : function(error){
                    console.log(error.responseText)
                    if(error.status == 400){
                        var response = JSON.parse(error.responseText);
                        $('.mensaje').fadeIn();
                        if(response.Message == 'duplicated entry'){
                            $('.mensaje').empty().append('<p>ERROR DE FORMULARIO</p>');
                        }else{
                            $('.mensaje').empty().append('<p>Lo sentimos, ha ocurrido un error</p>');
                        }
                        setTimeout(function(){
                            $('.mensaje').fadeOut();
                        },5000)
                    }
                }
            })
        })
    },    
    //Formualrio de NewsLetter Conexcion
    formularioModalNewsletter : function(){    
        $('#modal-tuiss').on('submit',function(e){
            e.preventDefault();    
            console.log('modal');  
            var email = $('#modal-email').val();
            var nombre = $('#modal-name').val();
            
            var datosToModal = {       
                "email":email,
                "nombre":nombre
                    }
            $.ajax({
                url:'/api/dataentities/MD/documents' ,
                data: JSON.stringify(datosToModal),
                contentType : 'application/json; charset=utf-8',
                type: 'POST',
                success : function(data){
                console.log('success')                
                $('#button-submit').fadeIn();
                $('#button-submit').empty().append('<h3>¡GRACIAS!</3>');
                
                setTimeout(function(){
                    document.querySelector(".modal-subscribe").remove();},2000)
                },
                error : function(error){
                    console.log(error.responseText)
                    if(error.status == 400){
                        var response = JSON.parse(error.responseText);
                        $('#button-submit').fadeIn();
                        if(response.Message == 'duplicated entry'){
                            $('#button-submit').empty().append('<p>ERROR</p>');
                        }else{
                            $('#button-submit').empty().append('<p>Lo sentimos</p>');
                            location.reload(true);
                        }
                        setTimeout(function(){
                            $('#button-submit').fadeOut();                

                        },2000)
                    }
                }
            })
        })
    },    
    openFAQ : function(){
        $('.withdrop-item').on('click','h2', function(e){
            $(this).next('div').toggle();
            if($('h2').hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            } 
        })
    },
    currencyElement: function(value, decimals, separators) {
        decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
        separators = separators || ['.', "'", ','];
        var number = (parseFloat(value) || 0).toFixed(decimals);
        if (number.length <= (2 + decimals))
            return number.replace('.', separators[separators.length - 1]);
        var parts = number.split(/[-.]/);
        value = parts[parts.length > 1 ? parts.length - 2 : 0];
        var result = value.substr(value.length - 3, 3) + (parts.length > 1 ? separators[separators.length - 1] + parts[parts.length - 1] : '');
        var start = value.length - 6;
        var idx = 0;
        while (start > -3) {
            result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start)) + separators[idx] + result;
            idx = (++idx) % 2;
            start -= 3;
        }
        return (parts.length == 3 ? '-' : '') + result;
    },
    replaceDecimalsEl: function(priceString, elementsArray) {
        if (priceString) {
            for (var i = 0, len = elementsArray.length; i < len; i++) {
                elementsArray[i].innerHTML = priceString.replace(/\s/, '').replace(",00", '');
            }
        }
    },
    unidadMultiplicadora: function() {
        var defaults = {
            liSelector: '.prateleira.vitrine ul li',
            liExclude: '.prateleira.vitrine ul li.helperComplement',
            callbacks: {
              onResponse: null
            }
        };
        
        $.typeProducts = function (options) {
            var settings  = {};
            settings = $.extend({}, defaults, options || {});    
            var setValuesResponse = function (response) {         
                // Iterando informacion
                $.each($(settings.liSelector).not(settings.liExclude), function(e, element) {
                    //console.log('element',element)
                    //$('.showcase-2020 .showcase-2020 ul li.helperComplement').remove();
                    var productId = $(element).find('.box-item').attr('data-idproduct')
                    var already = $(element).data('already')
                    
                    if(productId && !already){
                        var getProductInfo = response.find(function(product){
                            return product.productId === product.productId
                        });
                        if(getProductInfo){
                            var promotionPercentage = $(element).find('.flags__name-promotion .flag');
                            //Tag de descuento
                            if($(element).find('.flags__name-promotion .flag').length > 0) {
                                promotionPercentage = promotionPercentage.text().split("%")[0];
                                if(promotionPercentage.length > 0){
                                    $(element).find('.flags__discount').html(promotionPercentage + '%');
                                    $(element).find('.flags').addClass('Show');
                                }
                            }
                            //Precios
                            var t = getProductInfo.items[0].measurementUnit;
                            var priceElement = $(element).find('.best-price span').html().toString().replace(',00','').replace('$','').replace('.','');
                            priceElement = (((Number(priceElement) * 19)/100) + Number(priceElement));                 
                            if(t == "cm²") {
                                $(element).find('.typeProduct').html("m²");
                                priceElement = priceElement*10000;
                                var precio = configuracionesGenerales.currencyElement(priceElement, 0);
                                configuracionesGenerales.replaceDecimalsEl( "$"+precio , $(element).find('.best-price span') );                            
                            } else {
                                var precio = configuracionesGenerales.currencyElement(priceElement, 0);
                                configuracionesGenerales.replaceDecimalsEl( "$"+precio , $(element).find('.best-price span') );  
                            }
                            if($(element).find('.old-price span').length) {
                                var priceElementOld = $(element).find('.old-price span').html().toString().replace(',00','').replace('$','').replace('.','');
                                priceElementOld = (((Number(priceElementOld) * 19)/100) + Number(priceElementOld));                 
                                if(t == "cm²") {
                                    $(element).find('.typeProduct').html("m²");
                                    priceElementOld = priceElementOld*10000;
                                    var precioOld = configuracionesGenerales.currencyElement(priceElementOld, 0);
                                    configuracionesGenerales.replaceDecimalsEl( "$"+precioOld , $(element).find('.old-price span') );                            
                                } else {
                                    var precioOld = configuracionesGenerales.currencyElement(priceElementOld, 0);
                                    configuracionesGenerales.replaceDecimalsEl( "$"+precioOld , $(element).find('.old-price span') );  
                                }
                                if(promotionPercentage.length > 0) {
                                    var priceWithDiscount = configuracionesGenerales.currencyElement((priceElementOld - ((priceElementOld*promotionPercentage)/100)), 0)
                                    configuracionesGenerales.replaceDecimalsEl( "$"+priceWithDiscount , $(element).find('.best-price span') );
                                }
                            }
                            $(element).data('already', true);
                        }
                    }
                });
            }        
            var init = function () {
                var resultData = [];
                var _productIdList = [];
                
                $.each($(settings.liSelector).not(settings.liExclude), function(e, element) {
                    var productId = $(element).find('.box-item').attr('data-idproduct')
                    var already = $(element).data('already')
                    if(productId && !already){
                        if (_productIdList.indexOf(productId) === -1) {
                        _productIdList.push(productId);
                        }
                    }
                });
        
                // Lista de SKU por URL
                var skuParameters = $.map(_productIdList, function(productId) {
                    return 'productId%3A' + productId;
                }).join('%2C');
                
                // Cantidad de items por consulta
                var paginationLimit = 50;
        
                // Obtiene la cantidad de partes en las que se realizaran las consultas
                var numberOfPages = Math.ceil(_productIdList.length / paginationLimit);
        
                // Cadena de paginación
                var pagingString,
                start,
                end,
                requestCounter = 0,
                ajaxUrl;
        
                for (var index = 0; index < numberOfPages; index++) {
                start = paginationLimit * index;
                end = paginationLimit * (index + 1) - 1;
                pagingString = '&_from=' + start + '&_to=' + end;
                // Crea las url Ajax
                ajaxUrl =
                    '/api/catalog_system/pub/products/search?fq=' +
                    skuParameters +
                    pagingString;
                $.ajax({
                    url: ajaxUrl,
                    async: false
                }).done(function(data) {
                    requestCounter++;
                    resultData = resultData.concat(data);
                    if (requestCounter === numberOfPages) {
                    setValuesResponse(resultData);
                    }
                }).fail(function() {
                });
                }
            }        
            init();
        };
        $.typeProducts();
    }
};

$( document ).ready(function() {
    configuracionesGenerales.init(); 
    
});




  