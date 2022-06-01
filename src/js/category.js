
var configuracionesCategory = {
    init : function() {
        var width = screen.width;
        this.ComparePanel();       
        this.smartResearchMultiple();     
        this.pickerFilters();
        this.QuickStars();
        if(width < 767){
            $('.navigation-tabs').prepend('<div class="closeFilters"><img src="/arquivos/close-icon.png" alt="close icon"></div>');
            this.btnCloseFiltersMobile();
            this.openMobileFilters();
            this.openFilters();
            this.btnAplicar();
        }
    },
   

    QuickStars : function(){
       
           var vistaRapida=document.querySelectorAll(".prateleira ul li");   
            var botonVistaRapida = document.querySelectorAll("btnQuickview"); 
         setTimeout(() => {           
            for (let x = 0; x < vistaRapida.length; x++) {                
                vistaRapida[x].onmouseover = function(){
                   /*  console.log(this.querySelector("#spnRatingProdutoCategory").textContent);  */
                    var lasEstrellas = this.querySelector("#spnRatingProdutoCategory");
                    var lasEstrellasValor = this.querySelector("#spnRatingProdutoCategory").textContent;
                    localStorage.setItem("mistesrellas",lasEstrellas.outerHTML)
                    localStorage.setItem("valortesrellas",lasEstrellasValor)
                }        
            }
             
         }, 2000);
         
        

    },

    ComparePanel : function(){
        
        if(localStorage.getItem("miurl")){
            var temp = localStorage.getItem("miurl")            
            setTimeout(() => {
                localStorage.removeItem("miurl")
                window.location.href=temp;
                
            }, 1000);
        }

        setTimeout(function () {
        var comparePanel = document.querySelector('.compare:last-child');
        
        if (comparePanel) {
            var _text = document.createElement('span');
            _text.setAttribute('class', 'text_compare');
            _text.innerHTML = 'Productos a comparar: ';
            _;
            var _selected = document.createElement('div');
            _selected.classList.add('selected-items');

            var _button = document.createElement('a');
            _button.innerHTML = 'Comparar';
            _button.setAttribute('id', 'product-compare');
            _button.classList.add('btn-compararWrapper');
            _button.addEventListener('click', function () {
                localStorage.setItem("miurl",window.location.href); 
            if (document.querySelector('.selected-items').children.length < 2) {
                alert('Debe seleccionar 2 o más productos a comparar.');
            } else if (parseInt(document.querySelector('#NumeroSuperior').innerHTML) > 3) {
                alert('No es posible comparar más de 3 productos.');
            } else {
                document.querySelector('.btn-comparar').click();
            }
            });
            comparePanel.append(_button);
            comparePanel.append(_selected);
            comparePanel.prepend(_text);

            compareCheckboxs();
            clickCompareElems();
        }
        }, 500);

        function compareCheckboxs() {
            var selector = document.querySelector('.prateleira.vitrine');
            selector.addEventListener('click', function (e) {

          
              
            if (e.target.type == 'checkbox' && document.querySelector('.selected-items').children.length < 4) {
                var _id = e.target.id;
                e.stopPropagation();
                if (e.target.checked) {
                var img_container = document.createElement('div');
                img_container.setAttribute('id', 'item_' + _id);
                e.target.parentNode.querySelector('label').classList.add('checked');
                
                var img_src = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.product-image img').getAttribute('src');
                var img = document.createElement('img');
                img.setAttribute('src', img_src);
                img.classList.add('item-compare');
                img_container.append(img);
                document.querySelector('.selected-items').append(img_container);
                document.querySelector('.compare:last-child').classList.add('show');

                var numeromaximo = document.querySelector('#NumeroSuperior');                
                var numeroPermitido = document.querySelector('.selected-items').children.length;   
                numeromaximo.innerHTML = numeroPermitido;

                

                } else {
                    
                e.target.parentNode.querySelector('label').classList.remove('checked');
                
                if (document.querySelector('.selected-items').children.length == 0) {
                    document.querySelector('.compare:last-child').classList.remove('show');
                }
                }
              }else if (parseInt(document.querySelector('#NumeroSuperior').innerHTML) == 3) {
                var numeromaximo = document.querySelector('#NumeroSuperior');                
                var numeroPermitido = document.querySelector('.selected-items').children.length;   
                numeromaximo.innerHTML = numeroPermitido;
                    alert('No es posible comparar más de 3 productos.');
                    alert = function() {};                    
                }
                else if (parseInt(document.querySelector('#NumeroSuperior').innerHTML) == 4) {
                var numeromaximo = document.querySelector('#NumeroSuperior');                
                var numeroPermitido = document.querySelector('.selected-items').children.length;   
                numeromaximo.innerHTML = 3;
                    alert('No es posible comparar más de 3 productos.');
                } 
              

              $('.selected-items div').click(function() {
                var chekPointLabel = document.querySelectorAll(".product-compare label"); 
                var chekPoint = document.querySelectorAll(".product-compare input");
                for (var i = 0; i < chekPoint.length; i++) { 
                    chekPoint[i].setAttribute("type", "checkbox"); 
                                                      
               }        
                $(this).remove();
                setTimeout(() => {
                    var numeromaximo = document.querySelector('#NumeroSuperior');                
                    var numeroPermitido = document.querySelector('.selected-items').children.length;   
                    numeromaximo.innerHTML = numeroPermitido; 
                    if (document.querySelector('.selected-items').children.length == 0) {
                        document.querySelector('.compare:last-child').classList.remove('show');
                    }                   
                }, 200);
              
                
              });
              if (document.querySelector('.selected-items').children.length == 3){                      
                var chekPoint = document.querySelectorAll(".product-compare input");  
                var chekPointLabel = document.querySelectorAll(".product-compare label");                
                for (var i = 0; i < chekPoint.length; i++) { 
                    chekPoint[i].setAttribute("type", "box");   
                                                                  
                }                    
            }else{
                var chekPoint = document.querySelectorAll(".product-compare input");
                for (var i = 0; i < chekPoint.length; i++) { 
                     chekPoint[i].setAttribute("type", "checkbox"); 
                                                       
                }                   
              }
              
            });
        }
        function clickCompareElems() {
            document.querySelector('.selected-items').addEventListener('click', function (e) {
            document.querySelector(e.target.id.replace('item_', '#')).click();
            });
        }
    },
    btnAplicar: function() {
        $('.search-multiple-navigator h4').after('<h4 class="aplica-filtro">APLICAR FILTROS</h4>')
        
        $('.aplica-filtro').click(function(){
            $('.navigation-tabs').removeClass('activeMobile');
            $('body').removeClass('filtro-activo');
        })
    },
    openFilters : function(){
        $(document).on("click", ".search-multiple-navigator fieldset h5", function(){
            $(this).next('div').toggle();
            if($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            } 
        })
    },
    btnCloseFiltersMobile: function() {
        $('.closeFilters').click(function(){
            $('.navigation-tabs').removeClass('activeMobile');
            $('body').removeClass('filtro-activo');
        })
    },
    openMobileFilters : function() {
        $('.menu-buttom-mobile').click(function(){
            $('.navigation-tabs').toggleClass('activeMobile'); 
            $('body').addClass('filtro-activo');
        })
    },
    pickerFilters: function() {
        var colorFilter = document.querySelectorAll(".filtro_100_colores div label, .filtro_101_colores div label");
        var opcionesColor = [
            {codigo: "#FFFFFF", color: "Blancos"},
            {codigo: "#000000", color: "Negros"},
            {codigo: "#EBEBAC", color: "Beiges"},
            {codigo: "#BFC9CA", color: "Grises"},
            {codigo: "#291B06", color: "Marrón"},
            {codigo: "#DBA901", color: "Tierra"},
            {codigo: "#01DF01", color: "Verdes"},
            {codigo: "#0101DF", color: "Azules"},
            {codigo: "#FF0080", color: "Rosados"},
            {codigo: "#A16EAB", color: "Morados"},
            {codigo: "#F6E3CE", color: "Rosados"},
            {codigo: "#E1F5A9", color: "Verdes"},
            {codigo: "#535351", color: "Grises"},
            {codigo: "#C9C99D", color: "Grises claros"}
        ];
        for (i=0; i < colorFilter.length; i++) {
            var colorBgPicker = colorFilter[i].getAttribute("title");      
            var color = opcionesColor.find(function(c){
                return c.codigo === colorBgPicker
            })   
            color = color ? color.color : colorBgPicker;
            var colorNombre = document.createElement('p');
            colorNombre.classList.add("nombreColor")
            colorNombre.innerHTML = color;
            colorFilter[i].firstChild.after(colorNombre);
            var colorPicker = document.createElement('p');
            colorPicker.style.backgroundColor = colorBgPicker;
            colorFilter[i].firstChild.after(colorPicker);
        }         
    },
    smartResearchMultiple: function() {
        $("fieldset input[type='checkbox']").not("input[class='compare-product-checkbox']").vtexSmartResearch({
            filtersFullWrapper: ".search-multiple-navigator fieldset > div",
            loadContent: ".prateleira.vitrine[id^=ResultItems]",
            shelfClass: ".prateleira.vitrine",
            menuDepartament: ".navigation-tabs .menu-departamento",
            insertMenuAfter: ".search-multiple-navigator h3:first",
            emptySearchElem: $('<div class="vtexsr-emptySearch"></div>'),
            elemLoading: '<div id="scrollLoading">Cargando...</div>',
            returnTopText: '<span class="text">volver</span><span class="text2">ARRIBA</span>',
            emptySearchMsg: '<h3>No hay resultados para estos filtros</h3>',
            filterErrorMsg: "hubo un error al intentar filtrar.",
            showFiltersQty: true,
            trackGTM: false,
            orderByToCustom: false,
            orderByCustomPlace: '.search-multiple-navigator',
            showAppliedFilters: true,
            clearFiltersLink: true,
            clearFiltersLinkPlace: '#applied-filters',
            clearFiltersLinkText: 'Eliminar filtros',
            productsMergeClass: 'prateleira vitrine n1colunas',
            showAppliedFiltersTags: '#applied-filters'
        });
	}
}
$( document ).ready(function() {

	configuracionesCategory.init();
 	 
}); 