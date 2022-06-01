function closedModal(){	
    document.querySelector(".modal-subscribe-tuissco").remove()
}

var modalBg = document.querySelector(".modal-subscribe-tuissco");
function MostrarModal(){
    modalBg.classList.add('bg-active');
}

var ModalScreen = {
    init : function(){
        this.formularioModalNewsletter();
    },
    
    //Formualrio de NewsLetter Pop up
    formularioModalNewsletter : function(){  
        $('#habeasData').prop('checked', true);
        $('.terms label').addClass("checked");
        $('#habeasData').click(function () {
            var checked = $(this).prop('checked');
            console.log("check", checked)
            if(checked == true) {
                $('.terms label').addClass("checked");
            } else {
                $('.terms label').removeClass("checked");
            }
        });
        
        $('#modal-tuiss').on('submit', function(e) {
            e.preventDefault();    
            var email = $('#modal-email').val();
            var nombre = $('#modal-name').val();
            var habeasData = $('#habeasData').prop('checked');
            
            if(habeasData == false) {
                $('#thank-you').fadeIn();
                $('#thank-you h3').empty().append('Debes aceptar la política de tratamiento de datos para continuar.');
                setTimeout(function(){
                    $('#thank-you').fadeOut();
                },5000)
            } else {
                var datosToModal = {       
                    "email": email,
                    "nombre": nombre,
                    "habeasdata": habeasData
                }
                $.ajax({
                    url:'/api/dataentities/MD/documents' ,
                    data: JSON.stringify(datosToModal),
                    contentType : 'application/json; charset=utf-8',
                    type: 'POST',
                    success : function(data){
                        console.log('success')                
                        $('#button-submit').fadeIn();
                        $('#button-submit').empty().append('<h3>¡GRACIAS!</h3>');
                    
                        setTimeout(function(){
                            document.querySelector(".modal-subscribe-tuissco").remove();
                        },1000)
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
                            },1000)
                        }
                    }
                })
            }
        })
    },    

    //Final NewsLetter
};

$( document ).ready(function() {
    setTimeout( function(){MostrarModal();}, 5000);
    ModalScreen.init(); 
    
});


