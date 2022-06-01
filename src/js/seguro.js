var formularioSeguridades = {
    init : function(){
        this.formularioSeguridad();   
        this.showAdjuntos();
    },
    showAdjuntos: function(){
        $('#seguridad').on('click','.grupo-adjunto1', function(e){
            $('#form_archivo2').prop('disabled', false);
        })
        $('#seguridad').on('click','.grupo-adjunto2', function(e){
            $('#form_archivo3').prop('disabled', false);
        })
    },
    formularioSeguridad : function(){
        $('#seguridad').on('submit',function(e){
            e.preventDefault();

            var apellidos = $('.input-regla_apellido').val();
            var descripcion = $('.input-numero_comentario').val();
            var email = $('.input-regla_mail').val();
            var nombre = $('.input-regla_nombre').val();
            var documento = $('.input-numero_documento').val();
            var telefono = $('.input-regla_telefono').val();
            var terminos = $('.input-regla_box').prop('checked');
            var tipodocumento = $('.input-regla_tipo_documento').val();
            var solicitud = $('.input-regla_tipo_solicitud').val();
            var item = $('.input-regla_pedido').val();
            var refrencia = $('.input-regla_item').val();

            var grandeancho = $('.input-regla_grande_ancho').prop('checked');
            var grandealto = $('.input-regla_grande_alto').prop('checked');
            var cortoancho = $('.input-regla_corto_ancho').prop('checked');
            var cortoalto = $('.input-regla_corto_alto').prop('checked');
            var originalancho = $('.input-regla_original_ancho').val();
            var originalalto = $('.input-regla_original_alto').val();
            var nuevasancho = $('.input-regla_nuevas_ancho').val();
            var nuevasalto = $('.input-regla_nuevas_alto').val();
            var adjuntoArchivo1 = $('#form_archivo1').val();
            var adjuntoArchivo2 = $('#form_archivo2').val();
            var adjuntoArchivo3 = $('#form_archivo3').val();

            var datosToSave = {
                "apellidos": apellidos,
                "descripcion": descripcion,
                "email":email,
                "nombre":nombre,
                "documento":documento,
                "telefono":telefono,
                "terminos":terminos,
                "tipodocumento":tipodocumento,
                "solicitud":solicitud,
                "item":item,
                "referencia":refrencia,
                "nuevasancho":nuevasancho,
                "nuevasalto":nuevasalto,
                "originalalto":originalalto,
                "originalancho":originalancho,
                "masgrandedealto":grandealto,
                "masgrandedeancho":grandeancho,
                "cortodeancho":cortoancho,
                "cortodealto":cortoalto,
                "adjuntofotos": adjuntoArchivo1,
                "adjuntovideos": adjuntoArchivo2,
                "adjuntoFotosVideos": adjuntoArchivo3
            }
            $.ajax({
                url:'/api/dataentities/SR/documents' ,
                data: JSON.stringify(datosToSave),
                contentType : 'application/json; charset=utf-8',
                type: 'POST',
                success : function(data){
                console.log('success');

                //Archivo 1
                var file = jQuery("#seguridad").find('input[name="archivo1"]').prop('files')[0];
                var dataFile = new FormData();
                dataFile.append("adjuntofotos", file);
                var urlCOFile = "/api/dataentities/SR/documents/"+ data.DocumentId + "/adjuntofotos/attachments";
                console.log("data imagen", data.DocumentId, data);
                
                //Archivo 2
                var file2 = jQuery("#seguridad").find('input[name="archivo2"]').prop('files')[0];
                var dataFile2 = new FormData();
                dataFile2.append("adjuntovideos", file2);
                var urlCOFile2 = "/api/dataentities/SR/documents/"+ data.DocumentId + "/adjuntovideos/attachments";

                //Archivo 3
                var file3 = jQuery("#seguridad").find('input[name="archivo3"]').prop('files')[0];
                var dataFile3 = new FormData();
                dataFile3.append("adjuntoFotosVideos", file3);
                var urlCOFile3 = "/api/dataentities/SR/documents/"+ data.DocumentId + "/adjuntoFotosVideos/attachments";

                $.ajax({
                    data: dataFile,
                    type: 'POST',
                    url: urlCOFile,
                    cache: false,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,   
                    success: function(data){
                        console.log("File Uploaded! =D");
                        if(file2 != undefined){
                            $.ajax({
                                data: dataFile2,
                                type: 'POST',
                                url: urlCOFile2,
                                cache: false,
                                enctype: 'multipart/form-data',
                                contentType: false,
                                processData: false,   
                                success: function(data){
                                    console.log("File Video Uploaded! =D");
                                    if(file3 != undefined){
                                        $.ajax({
                                            data: dataFile3,
                                            type: 'POST',
                                            url: urlCOFile3,
                                            cache: false,
                                            enctype: 'multipart/form-data',
                                            contentType: false,
                                            processData: false,   
                                            success: function(data){
                                                console.log("File Archivo 3! =D");
                                                $('.mensaje').fadeIn();
                                                $('.mensaje').empty().append('<h3>¡Gracias por contactarnos!</3>');
                                                setTimeout(function(){
                                                    $('.mensaje').fadeOut();
                                                },5000)
                                            }
                                        });
                                    } else {
                                        $('.mensaje').fadeIn();
                                        $('.mensaje').empty().append('<h3>¡Gracias por contactarnos!</3>');
                                        setTimeout(function(){
                                            $('.mensaje').fadeOut();
                                        },5000)
                                    }
                                }
                            });
                        } else {
                            $('.mensaje').fadeIn();
                            $('.mensaje').empty().append('<h3>¡Gracias por contactarnos!</3>');
                            setTimeout(function(){
                                $('.mensaje').fadeOut();
                            },5000)
                        }

                    }
                });

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
    }
};

$( document ).ready(function() {
    formularioSeguridades.init(); 
});






  