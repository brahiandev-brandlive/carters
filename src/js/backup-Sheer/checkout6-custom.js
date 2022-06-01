
(function($){
    var settingsDefault= {
		elementsFormatVtex: [
            '.item__showcase_new__price-bestr'
        ],// Elementos a los que se le aplica formate de numero default vtex
        addSimboloFormat: '$', // Añadir un simbolo al inicio de un valor formateado
        numeroDecimales: 0,  // Caracter separador decimales
        caracterDecimal: ',',  // Caracter separador decimales
        caracterUnidad: '.',  // Caracter separador unicades Mil
    }
        
    $.FORMATVTEX= function(options){
        var t = this;
        var settings = $.extend({}, settingsDefault, options || {});
        var init= function(){
            t.startFormatVtex();
        };
        /** Metodo inicio formateo numeros precios por default vtex */
        t.startFormatVtex= function(){
            $.each(settings.elementsFormatVtex, function(key, value){
                var _elementPrice= $(document).find(value);
                $.each(_elementPrice, function(){
                    var textPrice= $(this).text();
                    if(typeof textPrice === 'string'){
                        textPrice= textPrice.replace(settings.addSimboloFormat, '');
                        textPrice= textPrice.replace(',00', '');
                        textPrice= textPrice.replace(/\./g, '');
                        $(this).text(settings.addSimboloFormat+' '+t.number_format(parseFloat(textPrice),settings.numeroDecimales,settings.caracterDecimal,settings.caracterUnidad));
                    }
                });
            });
        };
        /**
         * Metodo para cargar producto order form
         */
         t.number_format= function (amount, decimalCount, decimal, thousands){
            try {
                decimalCount= decimalCount== undefined ? 2 : decimalCount;
                decimal= decimal== undefined ? '.' : decimal;
                thousands= thousands== undefined ? ',' : thousands;
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
        
            const negativeSign = amount < 0 ? "-" : "";
        
            var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            var j = (i.length > 3) ? i.length % 3 : 0;
        
            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1"+thousands ) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
            //console.log(e)
            }
        };
        init();
    }; 
})(jQuery);

// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

//Función que cambia el front de los tipos de documento en el checkout
function noDocument() {
    $(document).on("click","#no-document-key",function(a) {
        a='\x3cselect id\x3d"selectNoDocument" name\x3d"documentselector"\x3e';
        a+='  \x3coption selected value\x3d"Pasaporte"\x3ePasaporte\x3c/option\x3e';
        a+='\t \x3coption value\x3d"cedula-extranjera"\x3eC\u00e9dula de extranjer\u00EDa\x3c/option\x3e';
        a+="\x3c/select\x3e";
        0==$("#selectNoDocument").length&&(clientProfileData.alternateDocumentType("Pasaporte"),$("#client-document-type").css("display","none"),$("#client-document-type").after(a))
    });
    if($("#client-document-type")&&0==$("#selectNoDocument").length) {
        $("#client-document-type").css("display","none");
        var b=$("#client-document-type").val(),
        c="",
        d="";"Pasaporte"==b?c="selected":d="selected";b='\x3cselect id\x3d"selectNoDocument" name\x3d"documentselector"\x3e';b+="  \x3coption "+c+' value\x3d"Pasaporte"\x3ePasaporte\x3c/option\x3e';b+="\t \x3coption "+d+' value\x3d"cedula-extranjera"\x3eC\u00e9dula de extranjer\u00EDa\x3c/option\x3e';b+="\x3c/select\x3e";$("#client-document-type").after(b);
        clientProfileData.alternateDocumentType($("#client-document-type").val())
    };
    $("#selectNoDocument").change(function() {
        var a=$(this).val();"cedula-extranjera"==a&&(a="C\u00e9dula de extranjer\u00EDa");clientProfileData.alternateDocumentType(a)
    });
}

var carritoCustom = function(){
	var config= {
		nameAttachmentPropiedades: 'propiedad',
		nameCategoriasNoVisibles: ['Opcionales'],
		indexNameColor: 'Color',
        selectorTabla: 'table.cart-items tbody'
	},
	t=this;
    t.carritoLoad = false;
    t.grupoCompletoItems = [];
	var init= function(){
		$(window).load(function(){
            t.changeBtns();
			t.iniciarAgrupacion();
            t.guardarInfo();
            t.termConditions();
            t.quantityAction();
		});
	};
    
    t.reload= function() {
        t.carritoLoad = false;
        t.iniciarAgrupacion();
        //t.guardarInfo();
        t.quantityAction();
    };
    /**Agrega checkbox de términos y condiciones*/
    t.termConditions= function () {
        $('<p class="terms-conditions"><input type="checkbox" id="terms-conditions-check" name="terms-conditions-check"><span class="active" for="terms-conditions-check">Acepto política de <a href="https://tuissco.myvtex.com/Politica-de-privacidad" target="_blank">tratamiento de datos y términos y condiciones.</a></span></p>').appendTo('.client-profile-data .form-step .box-client-info');
        $('#terms-conditions-check').prop('checked', true);
        $('#terms-conditions-check').click(function () {
            var checked = $(this).prop('checked');
            if(checked == true) {
                $('#go-to-shipping').prop('disabled', false);
            } else {
                $('#go-to-shipping').prop('disabled', true);
            }
        });

        $('<p class="terms-conditions"><input type="checkbox" id="terms-conditions-email-check" name="terms-conditions-email-check"><label class="active checked" for="terms-conditions-email-check">Acepto política de <a href="https://tuissco.myvtex.com/Politica-de-privacidad" target="_blank">tratamiento de datos y términos y condiciones.</a></label></p>').appendTo('.pre-email .client-email');
        $('#terms-conditions-email-check').prop('checked', true);
        $('#terms-conditions-email-check').click(function () {
            var checked = $(this).prop('checked');
            if(checked == true) {
                $('#btn-client-pre-email').prop('disabled', false);
                $('.active').addClass("checked");
            } else {
                $('#btn-client-pre-email').prop('disabled', true);
                $('.active').removeClass("checked");
            }
        });
    };
	/** Iniciar agrupacion listado checkout*/
	t.iniciarAgrupacion= function(){
        //var orderForm = vtexjs.checkout.orderForm;
        vtexjs.checkout.getOrderForm().then(function(orderForm){
            //console.log("el order", orderForm)
            // Ocultar items por categoria
            t.ocultaItemsPorCategoria(orderForm.items);
            // Agrupar items por attachment
            var ItemsAgrupados= t.agruparItemsOrder(orderForm.items);
            
            /** Asignar atributo attachment a la etiqueta tr*/
            t.setVariableDataTR(orderForm.items, config.selectorTabla);
    
            //Agregar información desde front
            t.itemsPropiedades(ItemsAgrupados);
            if(orderForm.items.length > 0) {
                t.carritoLoad = true;
            }
        })		
	};
    t.updateGrupoCompleto= function(){
        var orderForm = vtexjs.checkout.orderForm;		
        // Agrupar items por attachment
        var ItemsAgrupados= t.agruparItemsOrder(orderForm.items);
        t.grupoCompletoItems = ItemsAgrupados;
    };
    /**
     * Metodo para Asignar data-atachment tr 
     * @param items // Array con la lista de items del ordenform 
     * @param selectorTabla // String con el selector de la tablla donde se encuentran los items del orderform
     */
    t.setVariableDataTR= function(items, selectorTabla){        
        if(typeof items === 'object'){
            var _elementTableProduct= document.querySelector(selectorTabla);
            if(_elementTableProduct){// Si existe el elemento en el DOM 
                var filasTabla= _elementTableProduct.children;
                var contItemOrderform= 0; // Contador Item OrderForm
                for (var i = 0; i < filasTabla.length; i++) {
                    if(filasTabla[i].dataset.sku){       
                        //console.log("aca en setVariableDataTR", contItemOrderform, filasTabla[i], items[contItemOrderform])

                        if(items[contItemOrderform].attachments.length) {
                            //console.log("item en setVariableDataTR", items[contItemOrderform], filasTabla[i].classList)
                            filasTabla[i].classList.add('id-' + items[contItemOrderform].attachments[0].content.ID);
                        }                
                        contItemOrderform++;
                        //console.log("aca contador en setVariableDataTR", contItemOrderform)
                    }
                }
            }

        }
    };

    /* Agrega información de items en front*/
    t.itemsPropiedades= function(items){
        $.each(items, function(key, item){            
            var grupoItem = item.itemRelacion;
            //console.log("grupo", grupoItem);
            var opcionales = grupoItem.filter(function(item){
                return item.productCategories[2] ? true : false;
            })
            //console.log("opcionales", opcionales);
            var contieneCenefa = false;
            var infoCenefa, infoMotor, precioMotorFull, precioMotorDcto, precioCenefaFull, precioCenefaDcto;
            var contieneMotor = false;
            var precioCenefa = 0;
            var precioMotor = 0;
            var precioSinDctoCenefa = 0;
            var precioSinDctoMotor = 0;
            for(var o = opcionales.length -1; o >= 0; o--){                
                if(opcionales[o].name.toLowerCase().includes("motor")) {
                    contieneMotor = true;
                    precioMotor = t.currencyElement(((Number(opcionales[o].priceDefinition.total.toString().slice(0,-2)*19)/100) + Number(opcionales[o].priceDefinition.total.toString().slice(0,-2))), 0);                    
                    infoMotor = opcionales[o];
                    precioMotorFull = opcionales[o].price;
                    precioMotorDcto = opcionales[o].sellingPrice;
                    if (precioMotorFull != precioMotorDcto) {
                        precioSinDctoMotor = t.currencyElement((((Number(precioMotorFull.toString().slice(0,-2)*19)/100) + Number(precioMotorFull.toString().slice(0,-2)))*opcionales[o].quantity), 0);
                        //console.log("es", precioSinDctoMotor, precioMotorFull, precioMotorDcto);
                    } else {    
                        precioSinDctoMotor = precioMotor;              
                    }                   
                }
                if(opcionales[o].name.toLowerCase().includes("cenefa")) {
                    contieneCenefa = true;
                    precioCenefa = t.currencyElement(((Number(opcionales[o].priceDefinition.total.toString().slice(0,-2)*19)/100) + Number(opcionales[o].priceDefinition.total.toString().slice(0,-2))), 0);
                    infoCenefa = opcionales[o];
                    precioCenefaFull = opcionales[o].price;
                    precioCenefaDcto = opcionales[o].sellingPrice;
                    if (precioCenefaFull != precioCenefaDcto) {
                        precioSinDctoCenefa = t.currencyElement((((Number(precioCenefaFull.toString().slice(0,-2)*19)/100) + Number(precioCenefaFull.toString().slice(0,-2)))*opcionales[o].quantity), 0);
                        //console.log("es cenefa",precioSinDctoCenefa, precioCenefaFull, precioCenefaDcto);             
                    } else {
                        precioSinDctoCenefa = precioCenefa
                    } 
                }
            }
            for (var i = grupoItem.length - 1; i >= 0; i--) {     
                if(!grupoItem[i].productCategories[2]){
                    //Buscar los items
                    var itemsCompletos = t.buscarItems(grupoItem[i].productId);
                    //console.log("pick",grupoItem[i].productId, itemsCompletos.items, itemsCompletos)
                    //Buscar el hexadecimal del picker
                    var hexaPicker = t.colorPicker(grupoItem[i].id, itemsCompletos.items);

                    //Mostrar opcionales
                    var cenefa = '<div class="info-product-cenefa"> Cenefa: No </div>';
                    if(contieneCenefa) {
                        cenefa = '<div class="info-product-cenefa"> Cenefa: Si (+ $'+ precioCenefa +') </div>';
                    } else if (grupoItem[i].productCategoryIds == '/6/') {
                        cenefa = '<div class="info-product-cenefa" style="display:none"> Cenefa: No </div>';
                    }
                    var motor = '<div class="info-product-cenefa"> Motor: No </div>';
                    if(contieneMotor) {
                        motor = '<div class="info-product-cenefa"> Motor: Si (+ $'+ precioMotor +') </div>';
                    }
                                        
                    //Pintar las caracteristicas
                    var ancho = grupoItem[i].attachments[0].content.Ancho; 
                    var alto = grupoItem[i].attachments[0].content.Alto; 
                    var medidas = '<div class="info-product-ancho"> Medidas: '+ ancho +'x'+ alto +'cm</div>';
                    var color = '<div class="info-product-color"> Color: <div class="info-product-color-picker" style="background-color:'+ hexaPicker +'"></div>'+ grupoItem[i].colorName +'</div>';                
                    var ubicacionMando = grupoItem[i].attachments[0].content.Ubicacion_del_mando;
                    var ubicacionMandoNombre = (ubicacionMando == "DER") ? "Derecha" : "Izquierda";
                    var ubicacionMandoCont = '<div class="info-product-ubicacion"> Ubicación del mando: '+ ubicacionMandoNombre +'</div>';
                    
                    if($('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+'').length) {
                        //Información de producto
                        $('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' div[class="info-product"]').remove();
                        //Btn modificar
                        $('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' span[class="modificar-info"]').remove();
                        //Btn eliminar grupo
                        $('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' td[class="remove-all-group"]').remove();
                        //Selector de cantidad
                        $('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' td[class="choose-quantity-custom"]').remove();
                    }
                    var producNameContenedor = $(document).find('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' td[class="product-name"]');
                    producNameContenedor.append('<div class="info-product">' + medidas + color + cenefa + motor + ubicacionMandoCont + '</div>');
                    producNameContenedor.append('<span class="modificar-info"> MODIFICAR PRODUCTO </span>');
                    
                    var cantidad = Number(grupoItem[i].attachments[0].content.Cantidad);
                    producNameContenedor.after('<td class="choose-quantity-custom"><div class="choose-quantity-container" id="choose-quantity-container"><input type="text" name="quantity" class="choose-qty pull-left" value="'+ cantidad +'"><div class="choose-quantity-btn pull-left"><button class="btn choose-quantity-btn-mas" id="mas-'+ i +'">+</button><button class="btn choose-quantity-btn-menos" id="menos-'+ i +'">-</button></div></div></td>')
                    var precioCompleto = Number(precioCenefa.toString().replace(".", "").replace("'", "")) + Number(precioMotor.toString().replace(".", "").replace("'", "")) + (Number((19 * grupoItem[i].priceDefinition.total.toString().slice(0, -2)) / 100) + Number(grupoItem[i].priceDefinition.total.toString().slice(0, -2)));
                    
                    var contenedorPrecios = $(document).find('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' td[class="quantity-price"] span[class="total-selling-price"]');
                    contenedorPrecios.html("$" + t.currencyElement(precioCompleto, 0));
                    //Si tiene descuento
                    var precioCortinaFull, precioCortinaDcto, precioSinDctoCortina;    
                    var precioSinDctoTotal;
                    //Calcular el precio full de la cortina                   
                    precioCortinaFull = grupoItem[i].price;
                    precioCortinaDcto = grupoItem[i].sellingPrice;
                    if (precioCortinaFull != precioCortinaDcto) {
                        precioSinDctoCortina = t.currencyElement((((Number(precioCortinaFull.toString().slice(0,-2)*19)/100) + Number(precioCortinaFull.toString().slice(0,-2)))*grupoItem[i].quantity), 0);
                        //console.log("es sheer o enrollable", precioCortinaFull, precioCortinaDcto, precioSinDctoCortina);
                    } else {    
                        precioSinDctoCortina = t.currencyElement((Number(19 * grupoItem[i].priceDefinition.total.toString().slice(0, -2)) / 100) + Number(grupoItem[i].priceDefinition.total.toString().slice(0, -2)), 0);           
                    } 
                    //Calcular precio total
                    if(precioCortinaFull != precioCortinaDcto || precioMotorFull != precioMotorDcto || precioCenefaFull != precioCenefaDcto){ 
                        precioSinDctoTotal = t.currencyElement(Number(precioSinDctoCortina.toString().replace(".", "").replace("'", "")) + Number(precioSinDctoCenefa.toString().replace(".", "").replace("'", "")) + Number(precioSinDctoMotor.toString().replace(".", "").replace("'", "")), 0);
                        contenedorPrecios.before('<span class="total-fullprice"> $' + precioSinDctoTotal +'</span>')
                    }
                    //console.log("items", precioSinDctoTotal, grupoItem[i])
                    
                    //console.log("precios", contenedorPrecios, precioCenefa.toString().replace(".", "").replace("'", ""), precioMotor.toString().replace(".", "").replace("'", ""), ((Number(grupoItem[i].priceDefinition.total.toString().slice(0,-2)*19)/100) + Number(grupoItem[i].priceDefinition.total.toString().slice(0,-2))))
                    //console.log("ii", precioCompleto, grupoItem[i], ancho, alto, ubicacionMando, color);

                    //Eliminar grupo
                    $(document).find('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' td[class="quantity-price"]').after('<td class="remove-all-group"><div class="remove-all-group-btn"></div></td>')
                    var btnRemove = $(document).find('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' td[class="remove-all-group"]');
                    btnRemove.unbind();
                    btnRemove.click(function () {
                        t.removeItems(grupoItem)
                    });

                    //Modificar productos
                    var instalacion = grupoItem[i].attachments[0].content.instalacion;
                    var btnModificar = $(document).find('tr[data-sku="'+grupoItem[i].id+'"].id-'+grupoItem[i].attachments[0].content.ID+' span[class="modificar-info"]');
                    var id = grupoItem[i].id;
                    btnModificar.unbind();
                    btnModificar.click(function () {
                        t.pintarModificar(producNameContenedor, ancho, alto, instalacion, ubicacionMando, infoCenefa, infoMotor, id, itemsCompletos);
                    });
                }              
            }
        });
        if($(".loader").css("display") == "block") {
            $(".loader").fadeOut("slow");
        } 
        t.grupoCompletoItems = items;
        //console.log("estos items", items, t.grupoCompletoItems)
        //t.quantityAction();
    };
    t.guardarInfo= function(){
        $(document).on("click", ".guardar-info", function(e){
            $(".loader").fadeIn("slow");
            var elementPadre = $(this).parents('tr.product-item');
            var sku = elementPadre[0].attributes[3].nodeValue;
            var ancho = elementPadre.find('input[name="ancho-'+sku+'"]').val();
            var alto = elementPadre.find('input[name="alto-'+sku+'"]').val();
            var instalacion = elementPadre.find('input:radio[name=instalacion-'+sku+']:checked').val(); 
            var mando = elementPadre.find('input:radio[name=ubicacion_del_mando-'+sku+']:checked').val();
            var cantidad = elementPadre.find('input[name=quantity]').val();
            var IDgrupo = elementPadre.attr("class").split(" ").pop().replace("id-", "");
            
            var order = vtexjs.checkout.orderForm.items;
            //console.log("ancho", sku, ancho, alto, elementPadre, instalacion, mando, order, cantidad);
            //Buscar idsku
            var id = order.find(function(elem){return elem.id == sku;});
            //Buscar productId
            var refId = t.buscarItems(id.productId);

            //buscar nuevo SKU
            t.getInfoVariacionProducto(refId, ancho, alto, instalacion, mando, cantidad, sku, IDgrupo, e);
        })
    };
    t.cambioColor=function(){
        $(document).on("click", ".info-product-color-picker", function(){
            var elementPadre = $(this).parents(".modificar-producto");
            $(".info-product-color-picker.color-elegido").removeClass("color-elegido");
            $(this).addClass("color-elegido");            
            var skuColor = $(this).attr("data-sku");
            elementPadre.find('.guardar-info').attr("data-skuColor", skuColor);
        })
    };
    /*Buscar nuevo SKU*/
    t.getInfoVariacionProducto= function(refProduct, ancho, alto, instalacion, mando, cantidad, sku, IDgrupo, element){
        //console.log("referencia", refProduct);
        var nuevoProducto = $(".guardar-info").attr("data-skuColor");   
        var referenciaProducto = refProduct.productId;     
        if(nuevoProducto && refProduct != nuevoProducto) {
            referenciaProducto = nuevoProducto;
            //console.log("el nuev", referenciaProducto);
        }
        var itemsColeccion = [];
        $.ajax({
            url: '/api/dataentities/VP/search?_fields=coleccion,id_producto&id_producto=*' + referenciaProducto + '*',
            type: 'GET',
            success: function(data){
                //console.log(data);
                if(data.length > 0) {
                    var coleccion = data[0].coleccion;
                    $.ajax({
                        url: '/api/catalog_system/pub/products/search/?fq=H:' + coleccion ,
                        type: 'GET',
                        success: function(data){ 
                            for(var i=0; i < data.length; i++) {
                                const items = data[i].items;
                                for(var j=0; j< items.length; j++){
                                    itemsColeccion.push(items[j]);
                                }                            
                            }     
                            //console.log(itemsColeccion);  
                            t.priceSheer(refProduct, itemsColeccion, ancho, alto, instalacion, mando, cantidad, referenciaProducto, sku, IDgrupo, element);             
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            datos = undefined;
                        },
                        cache: false
                    });
                } else {
                   t.multiplyUnits(refProduct, ancho, alto, instalacion, mando, cantidad, sku, IDgrupo, element);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                datos = undefined;
            },
            cache: false
        });
    };
    /*Calcular precio y buscar SKU Enrollable*/
    t.multiplyUnits= async function(item, ancho, alto, instalacion, mando, cantidadAtt, skuActual, IDgrupo, element){
        //console.log("hizo clic", item, ancho, alto, instalacion, mando, orderform);  
        var skuNuevo = element.target.dataset.skucolor;
        //console.log("sku", element);
        var items = [];
        var itemsRemove = [];
        var itemsToUpdate = [];
        //Buscar limites
        var limites = t.buscaLimiteMedidas(item.limite);
        //Traer los opcionales
        t.traerOpcionalesoColores(item.productId, "suggestions");
        //Medidas
        var widthNumber = parseFloat(ancho.replace(',','.'));
        var heightNumber = parseFloat(alto.replace(',','.'));

        if(widthNumber>=limites.MinWidth && widthNumber<=limites.MaxWidth) {
            $(".buy-error-info p, .buy-error-info img").remove();
            if(heightNumber>=limites.MinHeight && heightNumber<=limites.MaxHeight) {
                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                var cantidad = parseInt($(".choose-qty").val());
                var totalMedida = Math.round((widthNumber*heightNumber));
                if (totalMedida > 10000) {
                    var unidades = totalMedida*cantidad;
                } else {
                    unidades = 10000*cantidad;
                }         
                //console.log("itemmm", item, unidades, widthNumber, heightNumber)       
                var grupoCompleto = t.agruparTraerGrupoPorID(IDgrupo);
                //console.log("esoooo", grupoCompleto.itemRelacion[0].attachments[0].content.Alto, grupoCompleto.itemRelacion[0].attachments[0].content.Ancho);
                var nuevoAttachment = {
                    "ID" : grupoCompleto.idAttachment,
                    "Ancho" : widthNumber,
                    "Alto" : heightNumber,
                    "instalacion" : instalacion,
                    "Ubicacion_del_mando" : mando,
                    "Cantidad" : cantidadAtt
                };
                var responseChange = await t.modificarAttachmentOpcionales(IDgrupo, nuevoAttachment);
                //console.log("respuesta", responseChange)

                if(responseChange) {     
                    var grupoCompletoAnterior = t.grupoCompletoItems.find(function(elem){return elem.idAttachment == IDgrupo;});
                    t.updateGrupoCompleto();

                    grupoCompleto = t.grupoCompletoItems.find(function(elem){return elem.idAttachment == IDgrupo;});
                    //console.log("grupo await", grupoCompleto, grupoCompletoAnterior);

                    var sku = grupoCompleto.itemRelacion.find(function(elem){return elem.id == skuActual;});
                    var altoAttachment = grupoCompletoAnterior.itemRelacion[0].attachments[0].content.Alto;
                    var anchoAttachment = grupoCompletoAnterior.itemRelacion[0].attachments[0].content.Ancho;
                    //Modificar SKU (cantidad) por cambio de medidas
                    if(altoAttachment != heightNumber || anchoAttachment != widthNumber) {                       
                        //Modificar cantidad Vtex               
                        var index = vtexjs.checkout.orderForm.items.indexOf(sku)
                        var itemToUpdate = {
                            "index": index,
                            "quantity": unidades
                        }
                        if(index > -1){
                            itemsToUpdate.push(itemToUpdate);
                        }                        
                        //console.log("modificar", index, itemToUpdate)
                    }
                    //Si hay que cambiar el SKU
                    if(skuNuevo && skuNuevo != sku.id){
                        //Agregar item nuevo
                        var itemNuevo = { id: skuNuevo, quantity: unidades, seller: '1' };
                        items.push(itemNuevo);       
                        //Agregar item a eliminar
                        itemsRemove.push(sku);                                
                    }         
                    //Opcionales
                    var opcionales = $(element.target).parents('.modificar-producto').find('.opcionale');
                    $.each(opcionales, function(key, value){
                        var skuOpcional = $(value).attr("datasku");

                        //console.log("opcional", skuOpcional)
                        var yaExisteSku = grupoCompleto.itemRelacion.find(function(elem){return elem.id == skuOpcional;});
                        var unidadesCenefa = Math.round((widthNumber*cantidadAtt));
                        if($(value).is(':checked')) {
                            if(!yaExisteSku) {
                                if($(value).val().includes("motor")) {
                                    var nuevoItem = { id: skuOpcional, quantity: cantidadAtt, seller: '1' };
                                    //console.log("no existe motor", nuevoItem);
                                    items.push(nuevoItem);
                                } else {                                
                                    var nuevoItem = { id: skuOpcional, quantity: unidadesCenefa, seller: '1' };
                                    //console.log("no existe cenefa", nuevoItem);
                                    items.push(nuevoItem);
                                }
                            } else {
                                if($(value).val().includes("cenefa") && (altoAttachment != heightNumber || anchoAttachment != widthNumber)) {
                                    var indexOpcional = vtexjs.checkout.orderForm.items.indexOf(yaExisteSku)
                                    var itemOpcionalToUpdate = {
                                        "index": indexOpcional,
                                        "quantity": unidadesCenefa
                                    }
                                    if(index > -1){
                                        itemsToUpdate.push(itemOpcionalToUpdate);
                                    }                                    
                                }
                            }
                        } else {
                            if(yaExisteSku) {
                                itemsRemove.push(yaExisteSku);
                            }
                        }
                    })
                    if(itemsToUpdate.length) {
                        //Modificar items
                        t.modificarOrder(itemsToUpdate); 
                        //console.log("update", itemsToUpdate)
                    }
                    if(itemsRemove.length) {
                        //Eliminar Items
                        t.removeItems(itemsRemove);
                        //console.log("remove", itemsRemove)
                    }
                    if(items.length) {
                        //Agregar nuevos items
                        t.AgregarOrder(items, nuevoAttachment); 
                        //console.log("nuevos items", items, nuevoAttachment)
                    } 
                    if(items.length == 0 && itemsToUpdate.length == 0 && itemsRemove.length == 0) {
                        //t.reload();
                        //console.log("nada")
                    } 
                }
            } else {
                $(".buy-error-info p, .buy-error-info img").remove();
                $(".buy-error-info").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tamaño de altura que ingresaste, elige un valor entre ' + limites.MinHeight + ' y ' + limites.MaxHeight + 'cm</p>');
                $(".loader").fadeOut("slow");
            }
        } else {
            $(".buy-error-info p, .buy-error-info img").remove();
            $(".buy-error-info").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tamaño de ancho que ingresaste no es válido, elige un valor entre ' + limites.MinWidth + ' y ' + limites.MaxWidth + 'cm</p>');
            $(".loader").fadeOut("slow");
        }

        //console.log(widthNumber, heightNumber)
    };
    /*Calcular precio y buscar SKU Sheer*/
    t.priceSheer= async function(item, coleccion, ancho, alto, instalacion, mando, cantidadAtt, nuevoItem, skuActual, IDgrupo, element){
        
        var items = [];
        var itemsRemove = [];
        var itemsToUpdate = [];
        var limites = t.buscaLimiteMedidas(item.limite);
        //console.log("entro sheer",limites, coleccion)
        //Opcionales
        t.traerOpcionalesoColores(item.productId, "suggestions");

        var widthNumber = parseFloat(ancho.replace(',','.'));
        var heightNumber = parseFloat(alto.replace(',','.'));
        var itemNew = {};

        if(widthNumber>=limites.MinWidth && widthNumber<=limites.MaxWidth) {
            $(".buy-error-info p, .buy-error-info img").remove();
            if(heightNumber>=limites.MinHeight && heightNumber<=limites.MaxHeight) {
                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                for(var i=0; i<coleccion.length; i++){
                    const width = coleccion[i].Medidas[0].split("|")[0];
                    const height = coleccion[i].Medidas[0].split("|")[1];                 
                    var minWidth = parseFloat(width.replace(',','.').split("-")[0]);
                    var maxWidth = parseFloat(width.replace(',','.').split("-")[1]);
                    var minHeight = parseFloat(height.replace(',','.').split("-")[0]);
                    var maxHeight = parseFloat(height.replace(',','.').split("-")[1]);
                    //console.log("valores", minWidth, maxWidth, minHeight, maxHeight, widthNumber, heightNumber);
                    if(
                        (widthNumber>=minWidth && widthNumber<=maxWidth) && 
                        (heightNumber>=minHeight && heightNumber<=maxHeight)
                    ) {
                        itemNew = coleccion[i];
                        break;
                    }
                } 
                //console.log("nuevo item", itemNew);
                var skuNuevo = itemNew.itemId;
                //console.log("item", skuNuevo)
                var grupoCompleto = t.agruparTraerGrupoPorID(IDgrupo);
                var nuevoAttachment = {
                    "ID" : grupoCompleto.idAttachment,
                    "Ancho" : widthNumber,
                    "Alto" : heightNumber,
                    "instalacion" : instalacion,
                    "Ubicacion_del_mando" : mando,
                    "Cantidad" : cantidadAtt
                };
                var responseChange = await t.modificarAttachmentOpcionales(IDgrupo, nuevoAttachment);

                if(responseChange){        
                    var grupoCompletoAnterior = t.grupoCompletoItems.find(function(elem){return elem.idAttachment == IDgrupo;})
                    t.updateGrupoCompleto();
                    grupoCompleto = t.grupoCompletoItems.find(function(elem){return elem.idAttachment == IDgrupo;});
                    
                    var sku = grupoCompleto.itemRelacion.find(function(elem){return elem.id == skuActual;});

                    //console.log("despues de actualizar", sku, grupoCompletoAnterior, grupoCompleto)
                    var altoAttachment = grupoCompletoAnterior.itemRelacion[0].attachments[0].content.Alto;
                    var anchoAttachment = grupoCompletoAnterior.itemRelacion[0].attachments[0].content.Ancho;

                    
                    //Si hay que cambiar el SKU
                    if(skuNuevo && skuNuevo != sku.id){
                        //Agregar item nuevo
                        var itemNuevo = { id: skuNuevo, quantity: cantidadAtt, seller: '1' };
                        items.push(itemNuevo);       
                        //Agregar item a eliminar
                        itemsRemove.push(sku);                                
                    }
                
                    //Opcionales
                    var opcionales = $(element.target).parents('.modificar-producto').find('.opcionale');
                    //console.log("estoss", opcionales);
                    $.each(opcionales, function(key, value){
                        var skuOpcional = $(value).attr("datasku");
                        var yaExisteSku = grupoCompleto.itemRelacion.find(function(elem){return elem.id == skuOpcional;});
                        var unidadesCenefa = Math.round((widthNumber*cantidadAtt));
                        if($(value).is(':checked')) {
                            if(yaExisteSku) {
                                if($(value).val().includes("cenefa") && (altoAttachment != heightNumber || anchoAttachment != widthNumber)) {
                                    /* var indexOpcional = vtexjs.checkout.orderForm.items.indexOf(yaExisteSku)
                                    var itemOpcionalToUpdate = {
                                        "index": indexOpcional,
                                        "quantity": unidadesCenefa
                                    }
                                    itemsToUpdate.push(itemOpcionalToUpdate);
                                    console.log("entro aca", itemOpcionalToUpdate); */
                                    var nuevoItem = { id: skuOpcional, quantity: unidadesCenefa, seller: '1' };
                                    //console.log("no existe cenefa", nuevoItem, opcionales[i]);
                                    items.push(nuevoItem);

                                    itemsRemove.push(yaExisteSku);  
                                }
                            } else {
                                if($(value).val().includes("motor")) {
                                    var nuevoItem = { id: skuOpcional, quantity: cantidadAtt, seller: '1' };
                                    //console.log("no existe motor", nuevoItem, opcionales[i]);
                                    items.push(nuevoItem);
                                } else {                                
                                    var nuevoItem = { id: skuOpcional, quantity: unidadesCenefa, seller: '1' };
                                    //console.log("no existe cenefa", nuevoItem, opcionales[i]);
                                    items.push(nuevoItem);
                                }
                            }
                        } else {
                            if(yaExisteSku) {
                                itemsRemove.push(yaExisteSku);
                            }
                        }
                    })

                    if(itemsToUpdate.length) {
                        //Modificar items
                        t.modificarOrder(itemsToUpdate); 
                        //console.log("entre a modificar", itemsToUpdate);
                    }
                    if(itemsRemove.length) {
                        //Eliminar Items
                        t.removeItems(itemsRemove);
                        //console.log("entre a quitar", itemsRemove);
                    }
                    if(items.length) {
                        //Agregar nuevos items
                        t.AgregarOrder(items, nuevoAttachment); 
                        //console.log("entre a agregar", items);
                    } else {
                        //t.reload();
                    } 
                }
            } else {
                $(".buy-error-info p, .buy-error-info img").remove();
                $(".buy-error-info").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tamaño de altura que ingresaste, elige un valor entre ' + limites.MinHeight + ' y ' + limites.MaxHeight + 'cm</p>');
                $(".loader").fadeOut("slow");
            }
        } else {
            $(".buy-error-info p, .buy-error-info img").remove();
            $(".buy-error-info").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tamaño de ancho que ingresaste no es válido, elige un valor entre ' + limites.MinWidth + ' y ' + limites.MaxWidth + 'cm</p>');
            $(".loader").fadeOut("slow");
        }
        //console.log(limites.MinWidth, widthNumber, heightNumber)
    };
    /*AGREGAR items Orderform*/
    t.AgregarOrder= function(items, attachmentInfo){
        vtexjs.checkout.addToCart(items, null, 1).then(function(orderForm) {                                         
            //console.log(orderForm)     
            var itemsNuevos = [];                                      
            for(var i = 0; i < orderForm.items.length; i++){
                if(orderForm.items[i].attachments.length < 1 ) {
                    var validador = t.validAttachmentItem(orderForm.items[i], "propiedad");
                    if(validador == true) {
                        itemsNuevos.push({index: i, nameAttch: "propiedad", attachInfo: attachmentInfo});
                    }
                }      
            } 
            //console.log(itemsNuevos, "itemsnuevos");
            t.addAttachmentItem(itemsNuevos);    
        }).done(function(orderForm){                    
            //console.log("Se agrego", orderForm)   
        }).fail(function(){
            //console.error( "Ocurrio un problema al agregar el producto al carro" );
        }); 
    };
    /*Valida que el producto tenga el attachment */
    t.validAttachmentItem= function(item, nameAttachment){
        var validateAttachment = false;
        for(var j = 0; j < item.attachmentOfferings.length; j++){
            if(item.attachmentOfferings[j].name == nameAttachment){
                validateAttachment = true;
            }
        }
        return validateAttachment
    },
    /*Agrega el contenido del attachment */
    t.addAttachmentItem= function(arrayItems) {
        var longitudItems = arrayItems.length;
        for(var i = 0; i < arrayItems.length; i++){
            if(i == (longitudItems - 1)){
                //console.log("ultimo item", i)
                vtexjs.checkout.addItemAttachment(arrayItems[i].index, arrayItems[i].nameAttch, arrayItems[i].attachInfo, null, false).then(function(response){
                    //t.reload();
                })                
            } else {
                vtexjs.checkout.addItemAttachment(arrayItems[i].index, arrayItems[i].nameAttch, arrayItems[i].attachInfo, null, false)
            }            
        }
    };
    /*Modificar items Orderform*/
    t.modificarOrder= function(grupoItem){
        //console.log("que voy a modificar", grupoItem)
        if(grupoItem.length > 0 && typeof grupoItem == "object"){
            vtexjs.checkout.updateItems(grupoItem, null, false).then(function(response){
                //console.log("ya modifique", grupoItem);
                //t.reload();
            })
        }
    };
    /*Agrupa y trae grupo con el mismo ID */
    t.agruparTraerGrupoPorID= function(itemID){
        var itemsOrderform= vtexjs.checkout.orderForm.items;
        //Todos los ID de attachment
        var todosLosGrupos = t.agruparItemsOrder(itemsOrderform);        
        var producto = itemsOrderform.find(function(elem){return elem.attachments[0].content.ID == itemID;});
        //Grupo con el mismo attachment
        var grupoAttachmentSku = todosLosGrupos.find(function(elem){return elem.idAttachment == producto.attachments[0].content.ID;});
        return grupoAttachmentSku;
    };
    /*Modificar Attachment*/
    t.modificarAttachmentOpcionales= async function(itemID, contentAttachment){
        $(".loader").fadeIn("slow");
        var itemsOrderform= vtexjs.checkout.orderForm.items;
        var grupoAttachmentSku = t.agruparTraerGrupoPorID(itemID);
        //Respuesta del attachment
        var responseAttachment= [];
        //console.log("este grupo modifica attach", grupoAttachmentSku, itemsOrderform, itemID)
        //Cambiar attachment
        for(var i = grupoAttachmentSku.itemRelacion.length - 1; i >= 0; i--){
            const index = itemsOrderform.indexOf(grupoAttachmentSku.itemRelacion[i]);
            var resAtt = await vtexjs.checkout.addItemAttachment(index, "propiedad", contentAttachment, null, false).then(function(res){
                return true;
            });
            responseAttachment.push(resAtt);
            //console.log("cuando modifico attach", index, grupoAttachmentSku.itemRelacion[i], contentAttachment)
        }
        return responseAttachment.length > 0 ? true : false;
    }
    /*Traer los opcionales y colores (productos similares) del producto*/
    t.traerOpcionalesoColores= function(item, tipo){
        var opcionales;
        $.ajax({
            type: "GET",
            url: '/api/catalog_system/pub/products/crossselling/'+ tipo +'/' + item,
            dataType: 'json',
            async: false,
            success: function (dataValue) {
                //console.log("Esta data opcionales", dataValue);
                opcionales = dataValue;
            },
            error: function () {
                alert("erro ao buscar objeto SKU");
            }
        });
        return opcionales;
    };
    /*Buscar el rango de medidas del producto*/
    t.buscaLimiteMedidas= function(limite) {
        var limiteWidth = limite[0].split("/")[0];
        var limiteHeight = limite[0].split("/")[1];

        var limiteMinWidth = parseFloat(limiteWidth.split(" ")[1]);
        var limiteMaxWidth = parseFloat(limiteWidth.split(" ")[5]);
        var limiteMinHeight = parseFloat(limiteHeight.split(" ")[2]);
        var limiteMaxHeight = parseFloat(limiteHeight.split(" ")[6]);

        var limiteMedidas = {MinWidth:limiteMinWidth, MaxWidth:limiteMaxWidth, MinHeight:limiteMinHeight, MaxHeight:limiteMaxHeight};

        return limiteMedidas;
    }
    /*Modificar producto*/
    t.pintarModificar= function(productName, ancho, alto, instalacion, mando, cenefa, motor, i, items){
        //Ocultar bloque de información
        productName.css("display","none");
        //Incluir modificar
        var htmlModificar = '';
        htmlModificar += '<td class="modificar-producto" id="modificar-producto'+ i +'">';
        htmlModificar += '<h2 class="nombre-producto">'+ productName.children('a')[0].innerHTML +'</h2>';
        htmlModificar += '<div class="measures-sku">';
        htmlModificar +=    '<p>Medidas</p>';
        htmlModificar +=    '<div class="measures-sku-insert">';
        htmlModificar +=            '<input type="text" size="5" value="'+ ancho +'" name="ancho-'+ i +'" class="measures-sku-insert-values" maxlength="5" placeholder="Ancho">';
        htmlModificar +=            '<input type="text" size="5" value="'+ alto +'" name="alto-'+ i +'" class="measures-sku-insert-values" maxlength="5" placeholder="Alto">';
        htmlModificar +=    '</div>'; 
        htmlModificar += '</div>';
        htmlModificar += '<div class="buy-error-info"></div>';        
        htmlModificar += '<div class="instalacion-prod">';
        htmlModificar +=    '<p>La cortina será instalada en:</p>';
        htmlModificar +=    '<div class="instalacion-prod-opc">';
        htmlModificar +=        '<div class="instalacion-prod-opc-item">';
        htmlModificar +=            '<p>Por dentro del marco</p>';
        htmlModificar +=            '<input type="radio" class="radio-sku" data-value="DVP-'+ i +'" value="DVP" name="instalacion-'+ i +'" id="dentro-marco-'+ i +'">';
        htmlModificar +=            '<label for="dentro-marco-'+ i +'">DVP</label>';
        htmlModificar +=        '</div>';
        htmlModificar +=        '<div class="instalacion-prod-opc-item">';
        htmlModificar +=            '<p>Por fuera del marco</p>';
        htmlModificar +=            '<input type="radio" class="radio-sku" data-value="FVP-'+ i +'" value="FVP" name="instalacion-'+ i +'" id="fuera-marco-'+ i +'">';
        htmlModificar +=            '<label for="fuera-marco-'+ i +'">FVP</label>';
        htmlModificar +=        '</div>';
        htmlModificar +=    '</div>';
        htmlModificar += '</div>';
        htmlModificar += '<div class="variacion-colores" id="variacion-colores-'+ i +'">';
        htmlModificar +=    '<p>Color</p>';
        htmlModificar +=    '<div class="variacion-colores-contenedor">';
        htmlModificar +=    '</div>';
        htmlModificar += '</div>';
        htmlModificar += '<div class="opcionales-prod motorizada">';
        htmlModificar +=    '<p>Motorizada</p>';
        htmlModificar +=    '<p class="price"><span class="price_best">No aplica</span></p>';
        htmlModificar +=    '<div class="opcionales-check">';
        htmlModificar +=        '<input type="checkbox" value="motor" data-value="motor-'+ i +'" name="motor-'+ i +'" data-sku="" class="radio-sku opcionale" id="motor-'+ i +'">';
        htmlModificar +=        '<label for="motor-'+ i +'">motor</label>';
        htmlModificar +=    '</div>';
        htmlModificar += '</div>';
        htmlModificar += '<div class="opcionales-prod cenefa">';
        htmlModificar +=    '<p>Cenefa</p>';
        htmlModificar +=    '<p class="price"><span class="price_best">No aplica</span></p>';
        htmlModificar +=    '<div class="opcionales-check">';
        htmlModificar +=        '<input type="checkbox" value="cenefa" data-value="cenefa-'+ i +'" datasku="" name="cenefa-'+ i +'" class="radio-sku opcionale" id="cenefa-'+ i +'" disabled>';
        htmlModificar +=        '<label for="cenefa-'+ i +'">cenefa</label>';
        htmlModificar +=    '</div>';
        htmlModificar += '</div>';
        htmlModificar += '<div class="ubicacion-mando">';
        htmlModificar +=    '<p>Ubicación del mando</p>';
        htmlModificar +=    '<div class="ubicacion-mando-opc">';
        htmlModificar +=        '<div class="ubicacion-mando-opc-item">';
        htmlModificar +=            '<p>Izquierdo</p>';
        htmlModificar +=            '<input type="radio" class="radio-sku" data-value="IZQ-'+ i +'" value="IZQ" name="ubicacion_del_mando-'+ i +'"  id="mando-izq-'+ i +'"><label for="mando-izq-'+ i +'">IZQ</label>';
        htmlModificar +=        '</div>';
        htmlModificar +=        '<div class="ubicacion-mando-opc-item">';
        htmlModificar +=            '<p>Derecho</p>';
        htmlModificar +=            '<input type="radio" class="radio-sku" data-value="DER-'+ i +'" value="DER" name="ubicacion_del_mando-'+ i +'" id="mando-der-'+ i +'"><label for="mando-der-'+ i +'">DER</label>';
        htmlModificar +=        '</div>';
        htmlModificar +=    '</div>';
        htmlModificar += '</div>';
        htmlModificar += '<span class="guardar-info" data-sku="'+ i +'" data-skuColor="">GUARDAR</span>';              
        htmlModificar += '</td>';
        productName.after(htmlModificar);

        //Traer opcionales por si no estan elegidos
        var traeOpcionales = t.traerOpcionalesoColores(items.productId, "suggestions");

        var infoMotor, infoCenefa;
        for(var o = traeOpcionales.length -1; o >= 0; o--){   
            //console.log("trae los opcipnale", traeOpcionales[o].items[0].name.toLowerCase());             
            if(traeOpcionales[o].items[0].name.toLowerCase().includes("motor")) {                              
                infoMotor = traeOpcionales[o];
            }
            if(traeOpcionales[o].items[0].name.toLowerCase().includes("cenefa")) {
                infoCenefa = traeOpcionales[o];
                //console.log("aca", infoCenefa)
            }
        }

        //Opciones ya elegidas desde PDP
        $('[data-value="'+  mando +'-'+ i+'"]').prop("checked", true);
        $('[data-value="'+  instalacion +'-'+ i+'"]').prop("checked", true);
        if(cenefa){
            $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod cenefa"]').css("display", "flex");
            $('[data-value="cenefa-'+ i+'"]').prop("checked", true);
            $('[data-value="cenefa-'+ i+'"]').prop("disabled", false);
            $('input[data-value="cenefa-'+ i +'"]').attr("datasku", cenefa.id);
            //console.log("precio cene", cenefa, infoCenefa)
            var priceCenefaInc = cenefa.sellingPrice;
            var priceCenefaIncList = cenefa.price;            
            $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod cenefa"] p[class="price"] span[class="price_best"]').html('$'+ t.currencyElement((((priceCenefaInc*19)/100) + priceCenefaInc), 0));
        
            //Si hay descuento
            if(priceCenefaInc != priceCenefaIncList){
                $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod cenefa"] p[class="price"]').append('<span class="price_list">$'+ t.currencyElement((((priceCenefaIncList*19)/100) + priceCenefaIncList), 0)+ '</span>');
            }
        }else {
            if(infoCenefa) {
                $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod cenefa"]').css("display", "flex");
                $('input[data-value="cenefa-'+ i +'"]').attr("datasku", infoCenefa.items[0].itemId);
                $('[data-value="cenefa-'+ i+'"]').prop("disabled", false);
                var priceCenefa = infoCenefa.items[0].sellers[0].commertialOffer.Price;
                var priceCenefaList = infoCenefa.items[0].sellers[0].commertialOffer.ListPrice;
                //console.log("otr precio cene", infoCenefa, priceCenefa, priceCenefaList)
                $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod cenefa"] p[class="price"] span[class="price_best"]').html('$'+ t.currencyElement(((((priceCenefa*19)/100) + priceCenefa).toString()*100), 0));
                
                //Si hay descuento
                if(priceCenefa != priceCenefaList) {
                    $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod cenefa"] p[class="price"]').append('<span class="price_list">$'+ t.currencyElement(((((priceCenefaList*19)/100) + priceCenefaList).toString()*100), 0)+ '</span>');
                }
            }
        }
        if(motor){
            $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod motorizada"]').css("display", "flex");
            $('[data-value="motor-'+ i+'"]').prop("checked", true);
            $('input[data-value="motor-'+ i +'"]').attr("datasku", motor.id);

            if(items.categoryId == 12) {
                $('[data-value="motor-'+ i+'"]').prop("disabled", true);
            }
            //console.log("precio mot", motor.price)
            var priceMotorInc = motor.sellingPrice;
            var priceMotorIncList = motor.price;
            $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod motorizada"] p[class="price"] span[class="price_best"]').html('$'+ t.currencyElement(((((priceMotorInc*19)/100) + priceMotorInc).toString().slice(0,-2)), 0));
        
            //Si tiene descuento
            if(priceMotorInc != priceMotorIncList){
                $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod motorizada"] p[class="price"]').append('<span class="price_list">$'+ t.currencyElement(((((priceMotorIncList*19)/100) + priceMotorIncList).toString().slice(0,-2)), 0)+ '</span>');
            }
        }else {
            if(infoMotor) {
                $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod motorizada"]').css("display", "flex");
                $('input[data-value="motor-'+ i +'"]').attr("datasku", infoMotor.items[0].itemId);
                var priceMotor = infoMotor.items[0].sellers[0].commertialOffer.Price;
                var priceMotorList = infoMotor.items[0].sellers[0].commertialOffer.ListPrice;
                //console.log("otr precio motor", infoMotor)
                $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod motorizada"] p[class="price"] span[class="price_best"]').html('$'+ t.currencyElement(((((priceMotor*19)/100) + priceMotor).toString()), 0));
            
                //Si tiene descuento
                if(priceMotor != priceMotorList){
                    $('td[id="modificar-producto'+ i +'"] div[class="opcionales-prod motorizada"] p[class="price"]').append('<span class="price_list">$'+ t.currencyElement(((((priceMotorList*19)/100) + priceMotorList).toString()), 0)+ '</span>');
                }
            }
        }
        //console.log("mando", motor);
        //Otros colores
        ////Color elegido
        var colorElegido= t.colorPicker(i, items.items);
        var color = '<div class="info-product-color-picker color-elegido picker-'+ i +'" style="background-color:'+ colorElegido +'" data-sku="'+ i +'"></div>';
        $(document).find('div[id="variacion-colores-'+ i +'"] div[class="variacion-colores-contenedor"]').append(color);
        ////Otros colores
        //console.log("co", colorElegido, items.productId)
        var otrosColores = t.traerOpcionalesoColores(items.productId, "similars");
        if(otrosColores.length){
            //Variación Sheer (productId para búsquedas posteriores)
            for(var j = otrosColores.length - 1; j >= 0; j--) {
                //console.log("entro aca color", otrosColores[j])
                var colorBg = otrosColores[j].items[0].Color;
                var colorAdd = '<div class="info-product-color-picker picker-'+ otrosColores[j].productId +'" data-sku="'+ otrosColores[j].productId +'" style="background-color:'+ colorBg +'"></div>';
                $(document).find('div[id="variacion-colores-'+ i +'"] div[class="variacion-colores-contenedor"]').append(colorAdd);    
            }
        } else {
            //Variación Otros productos
            for(var k = items.items.length - 1; k >= 0; k--) {
                var colorBg = items.items[k].Color;
                if(colorBg[0] !== colorElegido) {
                    var colorAdd = '<div class="info-product-color-picker picker-'+ items.items[k].itemId +'" data-sku="'+ items.items[k].itemId +'" style="background-color:'+ colorBg +'"></div>';
                    $(document).find('div[id="variacion-colores-'+ i +'"] div[class="variacion-colores-contenedor"]').append(colorAdd);        
                }
            }
        }
        t.cambioColor();
    };
    /*Formato precio*/
    t.currencyElement= function(value, decimals, separators) {
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
    };
    t.replaceDecimalsEl= function(priceString, elementsArray) {
        if (priceString) {
            for (var i = 0, len = elementsArray.length; i < len; i++) {
                elementsArray[i].innerHTML = priceString.replace(/\s/, '').replace(",00", '');
            }
        }
    };
    /* Eliminar items*/
    t.removeItems= function(grupoItem){
        //console.log("esto se quita 1", grupoItem);
        var itemsToRemove = [];
        for(var i = grupoItem.length -1; i >= 0; i--){
            const index = vtexjs.checkout.orderForm.items.indexOf(grupoItem[i])
            const item = {
                "index": index,
                "quantity": grupoItem[i].quantity
            }
            //console.log("para quitar 2", index, item)
            itemsToRemove.push(item);
        }
        //console.log("items para rem 3",grupoItem, itemsToRemove)
        vtexjs.checkout.removeItems(itemsToRemove).then(function(response){
            //console.log("ya quite 4", itemsToRemove);
            //t.reload();
        })
    };
    t.changeBtns= function(){
        var buyButton = $('#cart-to-orderform');
        if (buyButton.length > 0) {
            buyButton.appendTo('.summary-totalizers .accordion-inner');
            $('.summary-totalizers .accordion-inner').append('<div class="returnTuBuy">  <a href="/"><  Seguir comprando</a></div>')
        }
    }
    t.modificarCantidades= async function(counterQty, skuItem, IDattach, gruposCompleto) {
        var itemsToUpdate = [];
        var unidades, medidas;
        var grupoItem = gruposCompleto.find(function(elem){return elem.idAttachment == IDattach;});
        var completoItem = grupoItem.itemRelacion.find(function(elem){return elem.id == skuItem;});
        //console.log("modificar", grupoItem, completoItem, counterQty, skuItem, IDattach, gruposCompleto)
        //Modificar cantidad en attachment
        var nuevoAttachment = {
            "Cantidad" : counterQty
        };

        var responseChange = await t.modificarAttachmentOpcionales(completoItem.attachments[0].content.ID, nuevoAttachment);

        if(responseChange){        
            t.updateGrupoCompleto();
            grupoItem = t.grupoCompletoItems.find(function(elem){return elem.idAttachment == IDattach;});
            //Modificar cantidad Vtex
            
            $.each(grupoItem.itemRelacion, function(key, value){
                //console.log("entro al grupo para modificar")               
                if(value.productCategories[2]) {
                    //Entra si son opcionales
                    if(value.measurementUnit == 'un'){
                        //Si es motor
                        unidades = counterQty;    
                        //console.log("Es motor", unidades, value.quantity);                    
                    }else {
                        //Si es cenefa
                        medidas = Math.round(Number(value.attachments[0].content.Ancho));
                        if (medidas > 100) {
                            unidades = medidas * counterQty;
                        } else {
                            unidades = 100 * counterQty;
                        }
                        //console.log("Es cenefa", unidades, medidas, value.quantity);   
                    }
                } else {
                    //Entra si es producto principal
                    if(value.measurementUnit == 'un'){
                        //Si es sheer
                        unidades = counterQty;
                        //console.log("Es sheer", unidades, value.quantity);   
                    }else {
                        //Si es enrollable
                        medidas = Math.round(Number(value.attachments[0].content.Ancho) * Number(value.attachments[0].content.Alto));
                        if (medidas > 10000) {
                            unidades = medidas * counterQty;
                        } else {
                            unidades = 10000 * counterQty;
                        }
                        //console.log("Es enrollable", unidades, medidas, value.quantity); 
                    }
                }             
                const indexItem = vtexjs.checkout.orderForm.items.indexOf(value)
                const itemUpdate = {
                    "index": indexItem,
                    "quantity": unidades
                }                
                if(indexItem > -1){
                    itemsToUpdate.push(itemUpdate);
                }
                //console.log("cambiar cantidad item", itemsToUpdate, value, vtexjs.checkout.orderForm.items)
            });
            t.modificarOrder(itemsToUpdate);  
        };
    };
    /*Sumar o restar cantidad productos*/
    t.quantityAction= function (){
        //var counterQty;
        var count = 0;
        $(".choose-quantity-btn-mas").unbind();
        $(document).on("click", ".choose-quantity-btn-mas", function(e){
            e.preventDefault();
            if(count > 0){
                return
            }
            count++;
            var counterQty = Number($(this).parents(".choose-quantity-container").children("input").attr("value"));
            counterQty += 1;            
            var skuItem = $(this).parents(".product-item").attr("data-sku");
            var idItem = $(this).parents(".product-item").attr("class").split(" ").pop().replace("id-", "");
            
            //console.log("cuento", counterQty, skuItem, idItem);
            t.modificarCantidades(counterQty, skuItem, idItem, t.grupoCompletoItems); 
            //$(this).parents(".choose-quantity-container").children("input").attr("value", counterQty);

            $(".loader").fadeIn("slow");  
        });
        $(".choose-quantity-btn-menos").unbind();
        $(document).on("click", ".choose-quantity-btn-menos", function(e){
            e.preventDefault();
            if(count > 0){
                return
            }
            count++;
            var counterQty = Number($(this).parents(".choose-quantity-container").children("input").attr("value"));
            (counterQty <= 1) ? 1 : counterQty -= 1;
            //$(this).parents(".choose-quantity-container").children("input").attr("value", counterQty);            
            var skuItem = $(this).parents(".product-item").attr("data-sku");
            var idItem = $(this).parents(".product-item").attr("class").split(" ").pop().replace("id-", "");
            
            //console.log("cuento", counterQty, skuItem, idItem);
            t.modificarCantidades(counterQty, skuItem, idItem, t.grupoCompletoItems);   
            $(".loader").fadeIn("slow"); 
        });
    }
    /* Trae todos los items del producto */
    t.buscarItems= function(itemDeGrupo){
        var todosItemsGrupo;
        $.ajax({
            type: "GET",
            url: '/api/catalog_system/pub/products/search/?fq=productId:' + itemDeGrupo,
            dataType: 'json',
            async: false,
            success: function (dataValue) {
                //console.log("Esta data", dataValue[0]);
                todosItemsGrupo = dataValue[0];
            },
            error: function () {
                alert("erro ao buscar objeto SKU");
            }
        });
        return todosItemsGrupo;
    }
    /* Buscar hexadecimal del producto*/
    t.colorPicker= function(itemColor, grupo){
        var hexadecimal; 
        for (var i = grupo.length - 1; i >= 0; i--) { 
            var colorItem = grupo.find(function(elem){return elem.itemId == itemColor;});
            if(colorItem){
                hexadecimal = colorItem.Color[0];
                break;
            }
        }
        return hexadecimal;
    }
	/* Agrupacion Items*/
	t.agruparItemsOrder= function(items){
		var response=[],
		idsAttachment= t.obtenerIdAttachmentPropiedad(items); 
        //console.log('idsAttachment', idsAttachment);
		for (var i = idsAttachment.length - 1; i >= 0; i--) { 
			var objetoItemAgrupado= {idAttachment: idsAttachment[i], itemRelacion: [] };
			$.each(items, function(key, item){
				var attachmentPropiedad = item.attachments.find(function(elem){return elem.name == config.nameAttachmentPropiedades;});
				if(attachmentPropiedad){
					if(idsAttachment[i] == attachmentPropiedad.content.ID){
						item.colorName= t.getNameColor(item.name);
						objetoItemAgrupado.itemRelacion.push(item);
					}
				}
			});

			response.push(objetoItemAgrupado);
		}

		return response;
	};

	/* Metodo obtener nombre del color desde el name del sku*/
	t.getNameColor= function(nameSku){
		var colorName = nameSku.substring(nameSku.indexOf(config.indexNameColor), nameSku.length).split(' ');
		return colorName[1] ? colorName[1] : '';
	};

	/* Se obtiene los id unicos de los attchment del orderform*/
	t.obtenerIdAttachmentPropiedad= function(items){
		var response= [];
		$.each(items, function(key, item){
			var attachmentPropiedad = item.attachments.find(function(elem){return elem.name == config.nameAttachmentPropiedades;});
			
			if(attachmentPropiedad){
				var validExistente= response.find(function(elem){return elem == attachmentPropiedad.content.ID;});
				if(!validExistente){
					response.push(attachmentPropiedad.content.ID);
				}
			}
		});

		return response;
	};

	/* Ocultar por categorias*/
	t.ocultaItemsPorCategoria= function(items){
		$.each(items, function(key, item){
			var validCategoriaOcultar = false;
			$.each(item.productCategories, function(keyC, categoria){
				var conRelacionCategoria = config.nameCategoriasNoVisibles.find(function(elem){return elem == categoria;});
				if(conRelacionCategoria && conRelacionCategoria.length > 0){validCategoriaOcultar=true;}
			});
			if(validCategoriaOcultar){
				$(document).find('tr[data-sku="'+item.id+'"]').fadeOut();
			}
		});
	}

	init();
    return t;
};

var generalCarrito = carritoCustom();

$( document ).ready(function() {
    noDocument();
/*     setInterval(function(){
        $.FORMATVTEX({
            elementsFormatVtex: [
                '.monetary',
                '.srp-shipping-current-single__price',
                '.shp-summary-group-price',
                '.shp-option-text-price',  
            ]
        });
    },200)     */
});

/* $(window).load(function(){
    $(".loader").fadeOut("slow");
}); */

setInterval(function(){
    if(document.querySelector(".info-product") && document.querySelector(".cart")) {
        document.querySelector(".cart").style.display = "block";   
    } else if(document.querySelector(".cart")) {
        document.querySelector(".cart").style.display = "none";
        if(generalCarrito.carritoLoad === true){
            generalCarrito.reload();
            $(".loader").fadeIn("slow");
        }
    }
},500)

