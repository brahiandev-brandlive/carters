var starsRating;
var rating = 0;
var configuracionesReviews = {
    init : function() {
        this.saveReviewsandRating();
        this.postEvaluation();
        this.getInfoMasterdata();
        this.showFormReviews();

        starsRating = document.querySelectorAll('.ranking .ratingStar');
	    this.initializeStarWatch();
    },
    initializeStarWatch: function() {
        for (let i = 0; i < starsRating.length; i++) {
            starsRating[i].addEventListener("mouseover", function() {
                configuracionesReviews.starOnHover(i);
            });
            starsRating[i].addEventListener("mouseout", function() {
                configuracionesReviews.starLostHover();
            });
            starsRating[i].addEventListener("click", function() {
                configuracionesReviews.starOnClick(i);
            });
        }
    },   
    starOnHover: function(i) {
        configuracionesReviews.setStarsRating(i + 1);
    },  
    starOnClick: function(i) {
        rating = i + 1;
        configuracionesReviews.starLostHover();
    },    
    starLostHover: function() {
        configuracionesReviews.setStarsRating(0);
    },
    setStarsRating: function(i) {
        let stars = i > rating ? i : rating;
        for (const starRating of starsRating) {
            starRating.classList.add('far');
            starRating.classList.remove('fas');
            if (stars > 0) {
                starRating.classList.add('fas');
                starRating.classList.remove('far');
            }
            stars--;
        }
    },

   
    //Función para guardar en masterdata los comentarios y calificaciones
    saveReviewsandRating: function() {
        //Obtener calificación
        configuracionesReviews.postEvaluation();
        //Mandar formulario
        $('#formUserReview').on('submit',function(e){
            e.preventDefault();
            var optIn = $('#chkShowUserEmail').prop('checked');
            var assessment = $('#rtAvaliacao_SavedRate').val();
            if(optIn == true && assessment>0) {
                var name = $('#txtNombreResenha').val();
                var email = $('#txtEmailResenha').val();
                var description = $('#txtTextoResenha').val();            
                var assessment = $('#rtAvaliacao_SavedRate').val();
                var productID = $('#___rc-p-id').val();
                var datosToSave = {
                    'email': email,
                    'name': name, 
                    'description': description,
                    'assessment': assessment, 
                    'productID': productID,
                    'approved': false
                }
                $.ajax({
                    url:'/api/dataentities/PA/documents' ,
                    data: JSON.stringify(datosToSave),
                    contentType : 'application/json; charset=utf-8',
                    type: 'POST',
                    success : function(data){
                        $('#btSend').fadeOut();
                        $('.messageok').fadeIn();
                        $('.messageok').empty().append('¡GRACIAS POR TU COMENTARIO!');
                    },
                    error : function(error){
                        console.log(error.responseText)
                    }
                }) 
            }else{
                $('.messageok').empty().append('<p style="margin-top: 10px;"> ¡CALIFIQUE EL PRODUCTO ANTES!</p>');
            }
        })
    },
    //Obtiene la calificación de las estrellas
    postEvaluation: function() {
        $('.rating-avalie-wrapper span').click(function (e) {
            $('#rtAvaliacao_SavedRate').val(e.target.innerText)
        })
    },
    //Traer la información del Masterdata
    getInfoMasterdata: function() {
        var productID= $('#___rc-p-id').val();
        var stars = [];
        $.ajax({
            url: '/api/dataentities/PA/search?_fields=email,name,description,assessment,productID,approved&productID=*' + productID +'*',
            type: 'GET',
            success: function(data){               
                if(data.length > 0) {
                    $.each(data, function(key, value){
                        if(value.approved == true) {
                            stars.push(value.assessment);
                            configuracionesReviews.showReviews(value);
                        }                      
                    })
                    configuracionesReviews.quantityStars(stars);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                datos = undefined;
            },
            cache: false
        });
    },
    //Mostrar comentarios
    showReviews: function(data) {
        var contentReviews = $('#userReviewAllComments');
        if(contentReviews.length > 0) {
            var htmlreview = '';
            htmlreview += '<div class="review-contenido">';
            htmlreview += '<span class="review-contenido__stars star-'+ data.assessment +'"></span>';
            htmlreview += '<p class="review-contenido__comment">'+ data.description +'</p>';
            htmlreview += '<p class="review-contenido__name">'+ data.name +'</p>';
            htmlreview += '</div>';

            contentReviews.append(htmlreview)
        }
    },
    //Cantidad y promedio
    quantityStars: function(stars) {
        $('.media em span, #spnRatingProdutoTopCustom').text('(' + stars.length + ')');     
        var values = stars;
        if(values.length > 0) {
            var sum = values.reduce((previous, current) => current += previous);
            var avg = sum / values.length;
            $('.media em').before('<p>'+ Math.floor(avg) +'</p>')
            $('.media #spnRatingProdutoBottomCustom, #spnRatingProdutoTopCustom').addClass('stars' + Math.floor(avg));
        }        
        var votes = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };
        values.forEach(value => {
            votes[value] ++
        }); 
        
        for (const [key, value] of Object.entries(votes)){        
            if(value > 0) {
                const clase = '.number-votes.vote-' + key;
                const votos = document.querySelector(clase);
                votos.innerText = value + ' voto' + (value > 1 ? 's' : '');   
            }
        }
    },
    //Mostrar formulario
    showFormReviews: function() {
        var Buscador_ventana = setTimeout(() => {
            var quickEstrellas = document.querySelectorAll('.avaliacoes');
            console.log(quickEstrellas,"estrellas");
            var incrustacionEstrellas = localStorage.getItem("mistesrellas");
            var ValornEstrellas = localStorage.getItem("valortesrellas");
            if(ValornEstrellas!="0"){
            quickEstrellas[0].innerHTML = incrustacionEstrellas;
        }
            
            
        }, 2000);


        $('#lnkPubliqueResenha, .rating-avalie-wrapper div').click(function () {
            $('#formUserReview').fadeIn("slow");
        })
        $('#formUserReview .close').click(function () {
            $('#formUserReview').fadeOut("slow");
        })
    }
}
$( document ).ready(function() {
	configuracionesReviews.init();
}); 