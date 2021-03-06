var itemsColeccion = [];
var itemPropiedades = [];
var limiteMinWidth, limiteMaxWidth, limiteMinHeight, limiteMaxHeight;
var configuracionesProduct = {
    init: function () {
        var width = screen.width;
        this.multiplyUnits();
        this.priceWhithBtnEnrrollable();
        this.discountPercent();
        this.quantityAction();
        this.shareLinkPdp();
        this.btnCloseHelp();
        this.openWindowHelp();
        this.colorPicker();
        this.getInfoProduct();
        this.opcionales();
        this.colorElegido();
        this.pintarDocumentosEspecificaciones();
        this.pintarAyudas();
        this.showMuestrasGratis();
        this.btnCloseMuestras();
        this.addToCartMuestrasGratis();
        this.validarMedidas();
        //Crear contenedor para calcular el precio con la cantidad
        var temp = $('<span class="precio-oculto" data-value="" data-cenefa="" data-motor="">');
        $("body").append(temp);
        //this.addToCartWithVariation(skuJson.skus[0].sku);
    },
    //Agregar al carrito muestras gratis
    addToCartMuestrasGratis: function () {
        $('.muestra-gratis-send-btn').click(function (e) {
            var itemsMuestraGratis = [];

            if ($(".muestra-gratis__check").is(':checked')) {
                const muestrasGratisElegidas = document.querySelectorAll(".muestra-gratis__check:checked");
                for (var i = 0; i < muestrasGratisElegidas.length; i++) {
                    var skuMuestra = document.querySelectorAll(".muestra-gratis__check:checked")[i].value;
                    var itemMuestra = { id: skuMuestra, quantity: '1', seller: '1' };
                    itemsMuestraGratis.push(itemMuestra);
                }
            };

            if (itemsMuestraGratis.length > 0) {
                vtexjs.checkout.addToCart(itemsMuestraGratis, null, 1).then(function (orderForm) {

                }).done(function (orderForm) {
                    window.location = "/checkout";
                    console.log("se agrego!", orderForm)
                }).fail(function () {
                    console.error("Ocurrio un problema al agregar el producto al carro");
                });
            } else {

            }
        })
    },
    //Mostrar bot??n para elegir las muestras gratis
    showMuestrasGratis: function () {
        if ($('.muestra-gratis-contenedor-items li').length > 0) {
            $('.product-free-sample').css("display", "block");
            configuracionesProduct.openHelp($('.product-free-sample'), $('.muestra-gratis-contenedor'));
        }
    },
    btnCloseMuestras: function () {
        $('.muestra-gratis-close').click(function () {
            $('.muestra-gratis-contenedor').removeClass('activeHelp');
            $('body').removeClass('filtro-activo');
        })
    },
    //Ejecutar traer ayudas
    pintarAyudas: function () {
        $(document).on("click", ".btn-info-help-dvp", function () {
            configuracionesProduct.traerAyudasPDP("Instalaci??n por DENTRO del marco", "value-field imagenpor-dentro", "value-field texto-pordentro");
        });
        $(document).on("click", ".btn-info-help-fvp", function () {
            configuracionesProduct.traerAyudasPDP("Instalaci??n por FUERA del marco", "value-field imagenpor-fuera", "value-field texto-porfuera");
        });
        $(document).on("click", ".btn-info-help-measures-width", function () {
            configuracionesProduct.traerAyudasPDP("C??mo medir el ANCHO de tu cortina", "value-field imagen-ancho", "value-field texto-ancho");

            var videoYoutube = $("body").find("#videoAnchoYoutube");
            var urlYoutube = $("body").find("#videoYoutubeAncho");

            if (videoYoutube.length == 0) {
                if (urlYoutube.length > 0) {
                    urlYoutube = urlYoutube[0];
                    if ($(urlYoutube).attr('href').length > 0) {
                        urlYoutube = $(urlYoutube).attr('href');
                        var htmlVideo = '<iframe width="100%" height="315" src="' + urlYoutube + '"' +
                            ' title="YouTube video player" frameborder="0" allow="accelerometer;' +
                            'autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>' +
                            '</iframe>';
                        var sectionVideo = document.createElement("section");
                        sectionVideo.innerHTML = htmlVideo;
                        sectionVideo.setAttribute("id", "videoAnchoYoutube");
                        var contenedorAyuda = document.querySelector(".info-help-content-text");
                        contenedorAyuda.prepend(sectionVideo);
                    }
                }
            }

        });
        $(document).on("click", ".btn-info-help-measures-height", function () {
            configuracionesProduct.traerAyudasPDP("C??mo medir el ALTO de tu cortina", "value-field imagen-alto", "value-field texto-alto");
            var videoYoutube = $("body").find("#videoAlturaYoutube");
            var urlYoutube = $("body").find("#videoYoutubeAltura");
            if (videoYoutube.length == 0) {
                if (urlYoutube.length > 0) {
                    urlYoutube = urlYoutube[0];
                    if ($(urlYoutube).attr('href').length > 0) {
                        urlYoutube = $(urlYoutube).attr('href');
                        var htmlVideo = '<iframe width="100%" height="315" src="' + urlYoutube + '"' +
                            ' title="YouTube video player" frameborder="0" allow="accelerometer;' +
                            'autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>' +
                            '</iframe>';
                        var sectionVideo = document.createElement("section");
                        sectionVideo.innerHTML = htmlVideo;
                        sectionVideo.setAttribute("id", "videoAlturaYoutube");
                        var contenedorAyuda = document.querySelector(".info-help-content-text");
                        contenedorAyuda.prepend(sectionVideo);
                    }
                }

            }
        });
        $(document).on("click", ".box-item-opcional .btn-info-help", function () {
            var opcional = $(this).parents(".product-name")[0].children[0].innerText.toLowerCase();
            if (opcional.includes("cenefa")) {
                configuracionesProduct.traerAyudasPDP("Cenefa de aluminio", "value-field imagen-cenefa", "value-field texto-cenefa");
            } else {
                configuracionesProduct.traerAyudasPDP("Motorizaci??n", "value-field imagen-motor", "value-field texto-motor");
            }
        });
        $(document).on("click", ".btn-info-help-mando", function () {
            configuracionesProduct.traerAyudasPDP("Ubicaci??n del mando", "value-field imagen-ubicacion", "value-field texto-ubicacion");
        });
    },
    //Funci??n para traer ayudas de la PDP
    traerAyudasPDP: function (titulo, img, texto) {
        var contenedorAyuda = document.querySelector(".info-help-content-text");
        var contenedorTitulo = document.querySelector(".info-help-content-title");
        //Titulo
        contenedorTitulo.innerHTML = '<img src="/arquivos/info-icon-blanco.png" alt="Ayuda">' + titulo;
        //Contenido
        //var imgAyuda = document.getElementsByClassName(img);
        var docAyuda = document.getElementsByClassName(texto);
        if (docAyuda.length) {
            //imgAyuda = imgAyuda[0].innerHTML;
            docAyuda = docAyuda[0].innerHTML;
            contenedorAyuda.innerHTML = docAyuda;
        }
    },
    //Funci??n para ejecutar y pintar documentos
    pintarDocumentosEspecificaciones: function () {
        configuracionesProduct.traerDocumentosEspecificaciones("value-field Medidas", ".measures-content");
        configuracionesProduct.traerDocumentosEspecificaciones("value-field Instalacion", ".panel-installation-content");
    },
    //Funci??n para traer documentos de instalaci??n, medidas, etc
    traerDocumentosEspecificaciones: function (documento, contenedor) {
        var docMedidas = document.getElementsByClassName(documento);
        var contenedorMedidas = $(contenedor);
        if (docMedidas.length) {
            docMedidas = docMedidas[0].innerHTML;


            switch (contenedor) {
                case '.measures-content':
                    contenedorMedidas.append('<div class="docBtn"><a href="' + docMedidas + '" target="_blank">VER AQUI</a></div>');
                break;
                case '.panel-installation-content':
                    const PDFElement = document.getElementsByClassName('value-field Manual-de-instrucciones')
                    let PDF = ''
                    if (PDFElement.length) {
                        PDF = PDFElement[0].innerHTML;
                        contenedorMedidas.append('<div class="docBtn"><a href="' + PDF + '" target="_blank">VER MANUAL DE INSTALACI??N</a></div>');
                    }
                break;
            }

            if (contenedor != '.measures-content' && docMedidas != '') {
                contenedorMedidas.append(
                    `<div class="youtubeContainer">
                        <iframe
                            width="713"
                            height="401"
                            src="${ docMedidas }"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>`
                )
            }
        }
    },
    //Funci??n para mostrar color elegido
    colorElegido: function () {
        $(document).on("click", ".dimension-Color", function () {
            $(".dimension-Color").removeClass("color-elegido");
            $(this).addClass("color-elegido");
        })
    },
    //Funci??n para pintar los c??rculos con las variaciones de color
    colorPicker: function () {
        $(".dimension-Color").each(function () {
            var color = $(this).text();
            if (color.includes('.png') || color.includes('.jpg')) {
                $(this).css("background", "url(/arquivos/" + color + ")");
            } else {
                $(this).css("background-color", "" + color);
            }
        });
        $(".other-colors-sku .product-name li").each(function () {
            var color = $(this).text();
            $(this).css("background-color", "" + color);
        });
    },
    multiplyUnits: function () {
        $('.buy-button-prod').click(function (e) {
            if ($('.buy-button-prod.cargando').length == 0) {
                var widthNumber = parseFloat($("#insert-width-quantity").val().replace(',', '.'));
                var heightNumber = parseFloat($("#insert-height-quantity").val().replace(',', '.'));
                if (widthNumber >= limiteMinWidth && widthNumber <= limiteMaxWidth) {
                    $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                    if (heightNumber >= limiteMinHeight && heightNumber <= limiteMaxHeight) {
                        $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                        var cantidad = parseInt($(".choose-qty").val());
                        var totalMedida = Math.round((widthNumber * heightNumber));
                        if (totalMedida > 10000) {
                            var unidades = totalMedida * cantidad;
                        } else {
                            unidades = 10000 * cantidad;
                        }
                        var skuActual = $(".buy-button-ref").attr("href").split("&")[0].split("=")[1];

                        var items = [{ id: skuActual, quantity: unidades, seller: '1' }];

                        //Si hay opcionales (Cenefa, motor)                    
                        if ($(".opcionale").is(':checked')) {
                            const opcional = document.querySelectorAll(".opcionale:checked");
                            for (var i = 0; i < opcional.length; i++) {
                                var skuOpcional = document.querySelectorAll(".radio-sku.opcionale:checked")[i].value;

                                if (opcional[i].parentElement.children[3].firstElementChild.innerText.toLowerCase().includes("cenefa")) {
                                    if (widthNumber < 100) {
                                        widthNumber = 100;
                                    }
                                    var cantidadOpc = $(".choose-qty").val() * Math.round(widthNumber);
                                    var itemOpcional = { id: skuOpcional, quantity: cantidadOpc, seller: '1' };
                                } else {
                                    itemOpcional = { id: skuOpcional, quantity: cantidad, seller: '1' };
                                }
                                items.push(itemOpcional);
                            }
                        };

                        //Valores de attachments
                        var widthAtt = parseFloat($("#insert-width-quantity").val().replace(',', '.'));
                        var heightAtt = parseFloat($("#insert-height-quantity").val().replace(',', '.'));
                        var instalacionAtt = $('input:radio[name=instalacion]:checked').val();
                        var ubicacionMandoAtt = $('input:radio[name=ubicacion_del_mando]:checked').val();

                        if ($(".buy-button-ref").attr("href").indexOf("javascript:alert") !== 0) {
                            $(".seletor-sku-colores .buy-error-info").remove();
                            if (instalacionAtt) {
                                $(".buy-error-info p, .buy-error-info img").remove();
                                if (ubicacionMandoAtt) {
                                    $(".buy-button-prod").addClass("cargando");
                                    $(".buy-error-info p, .buy-error-info img").remove();

                                    var idAttachment = (Date.now() - 1510000000000);
                                    var cantidadAtt = cantidad;

                                    var attachmentInfo = {
                                        "Ancho": widthAtt,
                                        "Alto": heightAtt,
                                        "instalacion": instalacionAtt,
                                        "Ubicacion_del_mando": ubicacionMandoAtt,
                                        "ID": idAttachment,
                                        "Cantidad": cantidadAtt
                                    };

                                    vtexjs.checkout.addToCart(items, null, 1).then(function (orderForm) {
                                        var itemsNuevos = [];
                                        for (var i = 0; i < orderForm.items.length; i++) {
                                            if (orderForm.items[i].attachments.length < 1) {
                                                var validador = configuracionesProduct.validAttachmentItem(orderForm.items[i], "propiedad");
                                                if (validador == true) {
                                                    itemsNuevos.push({ index: i, nameAttch: "propiedad", attachInfo: attachmentInfo });
                                                }
                                            }
                                        }
                                        configuracionesProduct.addAttachmentItem(itemsNuevos);
                                    }).done(function (orderForm) {
                                    }).fail(function () {
                                        console.error("Ocurrio un problema al agregar el producto al carro");
                                    });

                                    // Call function to add aditional Attachment
                                    configuracionesProduct.addAttachments();
                                } else {
                                    $(".buy-error-info p, .buy-error-info img").remove();
                                    $(".ubicacion-mando").append('<div class="buy-error-info"><img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>Para continuar elige ubicaci??n del mando.</p></div>');
                                }
                            } else {
                                $(".buy-error-info p, .buy-error-info img").remove();
                                $(".instalacion-prod").append('<div class="buy-error-info"><img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>Para continuar elige c??mo ser?? instalada la cortina.</p></div>');
                            }
                        } else {
                            $(".seletor-sku-colores .buy-error-info").remove();
                            $(".seletor-sku-colores").append('<div class="buy-error-info"><img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>Elige un color para continuar.</p></div>');
                        }
                    }
                    else {
                        $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                        $(".measures-sku-error-values").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tama??o de altura que ingresaste no es v??lido, elige un valor entre ' + limiteMinHeight + ' y ' + limiteMaxHeight + 'cm</p>');
                    }
                }
                else {
                    $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                    $(".measures-sku-error-values").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tama??o de ancho que ingresaste no es v??lido, elige un valor entre ' + limiteMinWidth + ' y ' + limiteMaxWidth + 'cm</p>');
                }
            }
        })
    },
    addAttachments: async function () {

        // Add Utm Source
        const cookieUTM = document.cookie.split('IPS=Parceiro=').pop().split(';').shift();
        const searchCookie = document.cookie.search('IPS=Parceiro=')
        if (searchCookie != -1) {

            const marketingData = {
                utmSource: cookieUTM,
            }
            const attachment = await vtexjs.checkout.sendAttachment('marketingData', marketingData)

            console.log('Send Attachment Successfully');
            console.info('Attachment Order Form', attachment)
        } else {
            console.warn('WARNING: Cookie UTM not found (IPS)');
        }

    },
    priceWhithBtnEnrrollable: function () {
        $('.measures-sku-price-btn').click(function (e) {
            if ($('.label-temporal').length > 0) {
                $('.label-temporal').remove();
            }
            var op = document.querySelectorAll(".radio-sku.opcionale");
            if ($('.productName').text().toLowerCase().includes("motorizada") == true) {
                $(".radio-sku.opcionale").not('#opcional-243').checked = false;
                $(".radio-sku.opcionale").not('#opcional-243').prop("disabled", false);
            } else {
                for (var o = 0; o < op.length; o++) {
                    op[o].checked = false;
                };
            }
            var widthNumber = parseFloat($("#insert-width-quantity").val().replace(',', '.'));
            var heightNumber = parseFloat($("#insert-height-quantity").val().replace(',', '.'));

            var promotionPercentage2 = $('.flag-name-discount .flag').text().split("%")[0];
            if (promotionPercentage2.length > 0) {
                var precioMt2 = Number($(".skuBestPrice").text().replace('$', ''));
            } else {
                precioMt2 = Number($(".skuBestPrice").text().replace('$', '').replace('.', '').replace(',', '.'));
            }
            precioMt2 = ((precioMt2 * 21) / 100) + precioMt2;
            var totalMedida = Math.round((widthNumber * heightNumber));
            if (totalMedida > 10000) {
                var totalPrice = totalMedida * precioMt2;
            } else {
                totalPrice = 10000 * precioMt2;
            }
            //Si es motorizada se le suma el precio del motor
            if ($('.productName').text().toLowerCase().includes("motorizada") == true) {
                var precioMotorMotorizada = Number($('#opcional-243').parent().find(".price a .best-price span").text().replace('$', '').replace('.', '').replace(',', '.'));
                totalPrice = totalPrice + precioMotorMotorizada;
            }
            totalPrice = configuracionesGenerales.currencyElement(totalPrice, 0);
            if (widthNumber >= limiteMinWidth && widthNumber <= limiteMaxWidth) {
                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                if (heightNumber >= limiteMinHeight && heightNumber <= limiteMaxHeight) {
                    $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                    $(".price-best-price .skuBestPriceFormated")[0].innerHTML = "$" + totalPrice;
                    $(".price-best-price .skuBestPriceFormated").addClass("finalPrice");
                    $(".info-costo-minimo").css("display", "none");
                    $('.precio-oculto').attr("data-value", totalPrice);
                }
                else {
                    $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                    $(".measures-sku-error-values").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tama??o de altura que ingresaste no es v??lido, elige un valor entre ' + limiteMinHeight + ' y ' + limiteMaxHeight + 'cm</p>');
                }
            }
            else {
                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                $(".measures-sku-error-values").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>El tama??o de ancho que ingresaste no es v??lido, elige un valor entre ' + limiteMinWidth + ' y ' + limiteMaxWidth + 'cm</p>');
            }
        })
    },
    shareLinkPdp: function () {
        var shareLinksA = $(".product-share-links a");
        $(shareLinksA).each(function () {
            sharehref = $(this).attr("href"),
                url = window.location,
                toshareurl = sharehref + url,
                $(this).attr("href", toshareurl)
        });
        $('.product-share-links .link').on("click", function () {
            value = window.location;
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(value).select();
            document.execCommand("copy");
            $temp.remove();
        });
        $('.product-share-links .mailButton').on("click", function () {
            urlProduct = window.location;
            nameProduct = $('.product-name .productName').text();
            toshareurl = 'mailto:?subject=TUISS | ' + nameProduct + '&body=Mira la' + nameProduct + "de Tuiss. En el link:" + urlProduct;
            $(this).attr("href", toshareurl)
        });
    },
    discountPercent: function () {
        var promotionPercentage;
        if ($('.flag-name-discount .flag').length > 0) {
            promotionPercentage = $('.flag-name-discount .flag').text().split("%")[0];
            if (promotionPercentage.length > 0) {
                var contentProductDiscount = $('.product-image .flag-discount');
                contentProductDiscount.append('<div class="flag-discount-content"><span class="percent">-' + promotionPercentage + '%</span></div>');
            }
        }
    },
    multiplicar: function (a, b) {
        var prod = 0;
        var i = 1;
        while (i <= b) {
            prod += a;
            i++;
        }
        return prod;
    },
    quantityAction: function () {
        var counterQty = 1;

        $('.choose-qty').val(counterQty);
        $(".choose-quantity-btn-mas").unbind();
        $('.choose-quantity-btn-mas').click(function () {
            counterQty += 1;
            var precio = $(".precio-oculto").attr("data-value").replace('.', '');
            var precioC = $(".precio-oculto").attr("data-cenefa");
            precioC = (precioC > 0) ? precioC : 0;
            var precioM = $(".precio-oculto").attr("data-motor");
            precioM = (precioM > 0) ? precioM : 0;
            precio = Number(precio) + Number(precioC) + Number(precioM);

            $('.choose-qty').val(counterQty);

            if (precio) {
                var precioUnidades = configuracionesProduct.multiplicar(counterQty, precio);
                var precioFormat = configuracionesGenerales.currencyElement(precioUnidades, 0);
                configuracionesGenerales.replaceDecimalsEl("$" + precioFormat, $('.skuBestPriceFormated'));
            }
        });
        $(".choose-quantity-btn-menos").unbind();
        $('.choose-quantity-btn-menos').click(function () {
            (counterQty <= 1) ? 1 : counterQty -= 1;
            var precio = $(".precio-oculto").attr("data-value").replace('.', '');
            var precioC = $(".precio-oculto").attr("data-cenefa");
            precioC = (precioC > 0) ? precioC : 0;
            var precioM = $(".precio-oculto").attr("data-motor");
            precioM = (precioM > 0) ? precioM : 0;
            precio = Number(precio) + Number(precioC) + Number(precioM);

            $('.choose-qty').val(counterQty);

            if (precio) {
                var precioUnidades = configuracionesProduct.multiplicar(counterQty, precio);
                var precioFormat = configuracionesGenerales.currencyElement(precioUnidades, 0);
                configuracionesGenerales.replaceDecimalsEl("$" + precioFormat, $('.skuBestPriceFormated'));
            }
        });
    },
    btnCloseHelp: function () {
        $('.info-help-close').click(function () {
            $('.info-help').removeClass('activeHelp');
            $('body').removeClass('filtro-activo');
        })
    },
    openHelp: function (btn, contenedor) {
        btn.click(function () {
            contenedor.toggleClass('activeHelp');
            $('body').addClass('filtro-activo');
        })
    },
    openWindowHelp: function () {
        configuracionesProduct.openHelp($('.btn-info-help'), $('.info-help'));
    },
    getInfoProduct: function () {
        var refProductQckvw = document.getElementById("___rc-p-id").value;
        $.ajax({
            url: '/api/catalog_system/pub/products/search/?fq=productId:' + refProductQckvw,
            type: 'GET',
            success: function (data) {
                itemPropiedades = data[0];
                //Limite de medidas para campos de ancho y alto
                var limiteMedidas = data[0].limite;
                var limiteWidth = limiteMedidas[0].split("/")[0];
                var limiteHeight = limiteMedidas[0].split("/")[1];
                $("#insert-height-quantity").attr("placeholder", limiteHeight);
                $("#insert-width-quantity").attr("placeholder", limiteWidth);

                limiteMinWidth = parseFloat(limiteWidth.split(" ")[1]);
                limiteMaxWidth = parseFloat(limiteWidth.split(" ")[5]);
                limiteMinHeight = parseFloat(limiteHeight.split(" ")[2]);
                limiteMaxHeight = parseFloat(limiteHeight.split(" ")[6]);
                //Link del Quickview para ver el producto
                if ($("#productViewDetails")) {
                    $("#productViewDetails").attr("href", data[0].link);
                }

                //Determinar unidad de medida y formato de precio
                if (itemPropiedades.items[0].measurementUnit == "un") {
                    var priceListSheer = $(".price-best-price .skuBestPrice").text().replace('$', '').replace('.', '').replace(',', '.');
                    $(".price-best-price .skuBestPrice").css("display", "none");
                    if ($(".skuBestPriceFormated").length == 0) {
                        $(".price-best-price .skuBestPrice").after("<strong class='skuBestPriceFormated'></strong>");
                    }
                    var precioIvaSheer = (((Number(priceListSheer) * 21) / 100) + Number(priceListSheer));
                    var precioFormatSheer = configuracionesGenerales.currencyElement(precioIvaSheer, 0);
                    configuracionesGenerales.replaceDecimalsEl("$" + precioFormatSheer, $('.skuBestPriceFormated'));

                    //Si existe descuento
                    if ($(".price-list-price").length) {
                        var priceListSheer = $(".price-list-price .skuListPrice").text().replace('$', '').replace('.', '').replace(',', '.');
                        $(".price-list-price .skuListPrice").css("display", "none");
                        if ($(".skuListPriceFormated").length == 0) {
                            $(".price-list-price .skuListPrice").after("<strong class='skuListPriceFormated'></strong>");
                        }
                        var precioIvaSheer = (((Number(priceListSheer) * 21) / 100) + Number(priceListSheer));
                        var precioFormatSheer = configuracionesGenerales.currencyElement(precioIvaSheer, 0);
                        configuracionesGenerales.replaceDecimalsEl("$" + precioFormatSheer, $('.skuListPriceFormated'));
                    }
                } else {
                    var priceList = $(".price-best-price .skuBestPrice").text().replace('$', '').replace('.', '').replace(',', '.');
                    $(".price-best-price .skuBestPrice").css("display", "none");
                    if ($(".skuBestPriceFormated.skuPriceEnrollable").length == 0) {
                        $(".price-best-price .skuBestPrice").after("<strong class='skuBestPriceFormated skuPriceEnrollable'></strong>");
                    }
                    var precioIva = (((Number(priceList) * 21) / 100) + Number(priceList));
                    precioIva = precioIva * 10000;

                    if (itemPropiedades.categoryId == 12) {
                        $(".price-best-price .skuBestPriceFormated").addClass("finalPrice");
                        var precioMotorMotorizada = Number($('#opcional-243').parent().find(".price a .best-price span").text().replace('$', '').replace('.', '').replace(',', '.'));
                        precioIva = precioIva + precioMotorMotorizada;
                    }
                    var precioFormat = configuracionesGenerales.currencyElement(precioIva, 0);
                    configuracionesGenerales.replaceDecimalsEl("$" + precioFormat, $('.skuPriceEnrollable'));

                    //Si existe descuento
                    if ($(".price-list-price").length) {
                        var priceAntes = $(".price-list-price .skuListPrice").text().replace('$', '').replace('.', '').replace(',', '.');
                        $(".price-list-price .skuListPrice").css("display", "none");
                        if ($(".skuListPriceFormated.skuPriceEnrollableAntes").length == 0) {
                            $(".price-list-price .skuListPrice").after("<strong class='skuListPriceFormated skuPriceEnrollableAntes'></strong>");
                        }
                        var precioIvaAntes = (((Number(priceAntes) * 21) / 100) + Number(priceAntes));
                        precioIvaAntes = precioIvaAntes * 10000;
                        var precioFormatAntes = configuracionesGenerales.currencyElement(precioIvaAntes, 0);
                        configuracionesGenerales.replaceDecimalsEl("$" + precioFormatAntes, $('.skuPriceEnrollableAntes'));
                    }

                    if ($(".info-costo-minimo").length == 0) {
                        $(".productPrice").after("<span class='info-costo-minimo'>Cobro m??nimo 1 m??</span>");
                    }
                }

                //Si hay descuento reemplaza el precio con descuento basado en el %
                if ($('.flag-name-discount .flag').length > 0) {
                    var promotionPercentage2 = $('.flag-name-discount .flag').text().split("%")[0];
                    if (promotionPercentage2.length > 0) {
                        //Precio con descuento
                        var priceFull = $(".price-list-price .skuListPriceFormated").text().replace('$', '').replace('.', '').replace(',', '.');
                        var priceWithDiscount = configuracionesGenerales.currencyElement((priceFull - ((priceFull * promotionPercentage2) / 100)), 0)

                        //Precio con descuento en motorizadas
                        if (itemPropiedades.categoryId == 12) {
                            $(".price-best-price .skuBestPriceFormated").addClass("finalPrice");
                            var precioMotorMotorizada = Number($('#opcional-243').parent().find(".price a .best-price span").text().replace('$', '').replace('.', '').replace(',', '.'));
                            priceWithDiscount = configuracionesGenerales.currencyElement((precioMotorMotorizada + (priceFull - ((priceFull * promotionPercentage2) / 100))), 0)
                        }
                        configuracionesGenerales.replaceDecimalsEl("$" + priceWithDiscount, $('.skuBestPriceFormated'));

                        //Precio sin iva con descuento
                        var priceFullWithoutFormat = $('.price-list-price .skuListPrice').text().replace('$', '').replace('.', '').replace(',', '.');
                        priceFullWithoutFormat = (priceFullWithoutFormat - ((priceFullWithoutFormat * promotionPercentage2) / 100));
                        configuracionesGenerales.replaceDecimalsEl("$" + priceFullWithoutFormat, $('.skuBestPrice'));
                    }
                }
                var precio = $(".skuBestPriceFormated").text().replace('$', '');
                $('.precio-oculto').attr("data-value", precio);

                //Si es motorizada
                if (itemPropiedades.categoryId == 12) {
                    $('#opcional-243').prop("checked", true);
                    var op = document.querySelectorAll(".radio-sku.opcionale");
                    for (var o = 0; o < op.length; o++) {
                        op[o].disabled = true;
                    };
                    var labelTemp = $('<span class="label-temporal">');
                    $('.radio-sku.opcionale').not('#opcional-243').before(labelTemp);
                    $('.label-temporal').click(function () {
                        $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                        $(".measures-sku-error-values").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>Debes agregar el tama??o de ancho y alto y dar clic en OBTENER PRECIO antes de agregar opcionales.</p>');
                    })
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                datos = undefined;
            },
            cache: false
        });
    },
    opcionales: function () {
        if ($(".opcionales-sku").length) {
            for (var i = 0; i < $(".opcionales").length; i++) {
                if ($(".opcionales .product-name a")[i].getAttribute("title").toLowerCase().includes("motor")) {
                    $(".opcionales .price .best-price")[i].append(" (por cortina)");
                    var precioM = Number($(".opcionales .price .best-price span")[i].innerText.replace('$', '').replace('.', '').replace(',', '.'));
                    $(".opcionales .price .best-price span")[i].innerHTML = "$" + configuracionesGenerales.currencyElement(((((precioM) * 21) / 100) + (precioM)), 0);

                    //Si tienen descuento
                    if ($(".opcionales .price .old-price").length) {
                        if ($(".opcionales .price .old-price span")[i] != undefined) {
                            var precioMotorAntes = Number($(".opcionales .price .old-price span")[i].innerText.replace('$', '').replace('.', '').replace(',', '.'));
                            $(".opcionales .price .old-price span")[i].innerHTML = "$" + configuracionesGenerales.currencyElement(((((precioMotorAntes) * 21) / 100) + (precioMotorAntes)), 0);
                        }
                        $(".opcionales .price").addClass("conDcto");
                    }

                } else {
                    $(".opcionales .price .best-price")[i].append(" (por ML de ancho)");
                    var precioo = Number($(".opcionales .price .best-price span")[i].innerText.replace('$', '').replace('.', '').replace(',', '.'));
                    $(".opcionales .price .best-price span")[i].innerHTML = "$" + configuracionesGenerales.currencyElement(((((precioo * 100) * 21) / 100) + (precioo * 100)), 0);
                    //Si tienen descuento
                    if ($(".opcionales .price .old-price").length) {
                        if ($(".opcionales .price .old-price span")[i] != undefined) {
                            var precioCenefaAntes = Number($(".opcionales .price .old-price span")[i].innerText.replace('$', '').replace('.', '').replace(',', '.'));
                            $(".opcionales .price .old-price span")[i].innerHTML = "$" + configuracionesGenerales.currencyElement(((((precioCenefaAntes * 100) * 21) / 100) + (precioCenefaAntes * 100)), 0);
                        }
                        $(".opcionales .price").addClass("conDcto");
                    }
                }
                var opcional = document.getElementsByClassName("radio-sku opcionale")[i];
                opcional.addEventListener("click", function () {
                    if (this.checked) {
                        if ($(".skuBestPriceFormated").hasClass("finalPrice")) {
                            $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                            if (this.parentElement.children[3].firstElementChild.innerText.toLowerCase().includes("cenefa")) {
                                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                                var widthCenefa = parseFloat($("#insert-width-quantity").val().replace(',', '.'));
                                var cantidadOpcCenefa = $(".choose-qty").val() * Math.round(widthCenefa);
                                var valorCenefa = ((this.parentElement.children[4].firstElementChild.lastElementChild.firstElementChild.innerText.replace("$", "").replace(".", "").replace("'", "") * cantidadOpcCenefa) / 100);
                                var valorCenefaCortina = valorCenefa + parseFloat($(".price-best-price .skuBestPriceFormated")[0].innerHTML.replace("$", "").replace(".", "").replace("'", ""));
                                valorCenefaCortina = configuracionesGenerales.currencyElement(valorCenefaCortina, 0);
                                $(".price-best-price .skuBestPriceFormated")[0].innerHTML = "$" + valorCenefaCortina;
                                $('.precio-oculto').attr("data-cenefa", valorCenefa);
                            } else {
                                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                                var cantidadOpcMotor = $(".choose-qty").val();
                                var valorMotor = this.parentElement.children[4].firstElementChild.lastElementChild.firstElementChild.innerText.replace("$", "").replace(".", "").replace("'", "") * cantidadOpcMotor;
                                var valorMotorCortina = valorMotor + parseFloat($(".price-best-price .skuBestPriceFormated")[0].innerHTML.replace("$", "").replace(".", "").replace("'", ""));
                                valorMotorCortina = configuracionesGenerales.currencyElement(valorMotorCortina, 0);
                                $(".price-best-price .skuBestPriceFormated")[0].innerHTML = "$" + valorMotorCortina;
                                $('.precio-oculto').attr("data-motor", valorMotor);
                            }
                        }
                        else {
                            $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                            $(".measures-sku-error-values").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>Debes agregar el tama??o de ancho y alto y dar clic en OBTENER PRECIO antes de agregar opcionales.</p>');
                        }

                    } else {
                        if ($(".skuBestPriceFormated").hasClass("finalPrice")) {
                            $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                            if (this.parentElement.children[3].firstElementChild.innerText.toLowerCase().includes("cenefa")) {
                                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                                var widthCenefa = parseFloat($("#insert-width-quantity").val().replace(',', '.'));
                                var cantidadOpcCenefa = $(".choose-qty").val() * Math.round(widthCenefa);

                                var valorCenefa = ((this.parentElement.children[4].firstElementChild.lastElementChild.firstElementChild.innerText.replace("$", "").replace(".", "").replace("'", "") * cantidadOpcCenefa) / 100);
                                var valorCenefaCortina = parseFloat($(".price-best-price .skuBestPriceFormated")[0].innerHTML.replace("$", "").replace(".", "").replace("'", "")) - valorCenefa;
                                valorCenefaCortina = configuracionesGenerales.currencyElement(valorCenefaCortina, 0);
                                $(".price-best-price .skuBestPriceFormated")[0].innerHTML = "$" + valorCenefaCortina;
                                $('.precio-oculto').attr("data-cenefa", "");
                            } else {
                                $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                                var cantidadOpcMotor = $(".choose-qty").val();
                                var valorMotor = this.parentElement.children[4].firstElementChild.lastElementChild.firstElementChild.innerText.replace("$", "").replace(".", "").replace("'", "") * cantidadOpcMotor;
                                var valorMotorCortina = parseFloat($(".price-best-price .skuBestPriceFormated")[0].innerHTML.replace("$", "").replace(".", "").replace("'", "")) - valorMotor;
                                valorMotorCortina = configuracionesGenerales.currencyElement(valorMotorCortina, 0);
                                $(".price-best-price .skuBestPriceFormated")[0].innerHTML = "$" + valorMotorCortina;
                                $('.precio-oculto').attr("data-motor", "");
                            }
                        }
                        else {
                            $(".measures-sku-error-values p, .measures-sku-error-values img").remove();
                            $(".measures-sku-error-values").append('<img src="/arquivos/error-measures-values.png" alt="Error de medidas"/><p>Debes agregar el tama??o de ancho y alto y dar clic en OBTENER PRECIO antes de agregar opcionales.</p>');
                        }
                    }
                });
            }
        }
    },
    validAttachmentItem: function (item, nameAttachment, index, attachment) {
        var validateAttachment = false;
        for (var j = 0; j < item.attachmentOfferings.length; j++) {
            if (item.attachmentOfferings[j].name == nameAttachment) {
                validateAttachment = true;
            }
        }
        return validateAttachment
    },
    addAttachmentItem: function (arrayItems) {
        var longitudItems = arrayItems.length;
        for (var i = 0; i < arrayItems.length; i++) {
            if (i == (longitudItems - 1)) {
                vtexjs.checkout.addItemAttachment(arrayItems[i].index, arrayItems[i].nameAttch, arrayItems[i].attachInfo, null, false).then(function (response) {
                    window.location = "/checkout";
                })
            } else {
                vtexjs.checkout.addItemAttachment(arrayItems[i].index, arrayItems[i].nameAttch, arrayItems[i].attachInfo, null, false)
            }
        }
    },
    //Validaci??n input medidas
    validarMedidas: function () {
        //replace puntos por comma
        $('body').on('keyup', '#insert-width-quantity', function () {
            $(this).val($(this).val().toString().replace(/\./g, ','));
        });
        $('body').on('keyup', '#insert-height-quantity', function () {
            $(this).val($(this).val().toString().replace(/\./g, ','));
        });
    },
}

$(document).ready(function () {
    configuracionesProduct.init();
});

$(window).on("skuChanged.vtex", function (eventData, prodID, skuData) {
    var getSku = skuData.sku;
    var getInfoSku = skuJson.skus.find(function (skuId) {
        return skuId.sku == getSku;
    });
    $(".seletor-sku-colores .buy-error-info").remove();
    $('.choose-qty').attr("value", 1);
    $('.precio-oculto').attr("data-cenefa", "");
    $('.precio-oculto').attr("data-motor", "");
    var op = document.querySelectorAll(".radio-sku.opcionale");
    if ($('.productName').text().toLowerCase().includes("motorizada") == true) {
        $(".radio-sku.opcionale").not('#opcional-243').checked = false;
    } else {
        for (var o = 0; o < op.length; o++) {
            op[o].checked = false;
        };
    }
    configuracionesProduct.quantityAction();
    configuracionesProduct.getInfoProduct();
})