//Buscador Searcho
function buscador_input() {
  var datos_blog = document.getElementById("blog-page-body").value;
  /*   console.log(datos_blog);
   */

  var buscador_datos = document.getElementById("burcador_blog").value;
  /*   buscador_datos=  buscador_datos.replace(/\s/g, '_') */
  console.log(buscador_datos)
  //


  var slides_page = document.getElementById("slides");
  /*  console.log(slides_page); */
  slides_page.innerHTML = "";

  var blog_pages = slides_page.innerHTML += "<div><section id='list2'><nav><ul id='articulos1'></ul></nav><section></div>";
  /*  console.log(blog_pages); */



  $.ajax({
    url: '/api/dataentities/PB/search?_fields=titulo,contenido,fecha,filtro,pagina,imagen,estado&contenido=' + encodeURI('*' + buscador_datos + '*'),
    type: 'GET',
    success: function (data) {
      console.log(data);
      /*         console.log(data.length);
       */
      const principal_blog = document.getElementById('articulos1');
      /* console.log(principal_blog); */

      for (var i = 0; i < data.length; i++) {


        titulo = data[i].titulo;
        contenido = data[i].contenido;
        fecha = data[i].fecha;
        filtro = data[i].filtro;
        pagina = data[i].pagina;
        imagen = data[i].imagen;
        /*     console.log(data[i].titulo);
            console.log(data[i].contenido);
            console.log(data[i].fecha);
            console.log(data[i].filtro);
            console.log(data[i].pagina);
            console.log(data[i].imagen); */

        principal_blog.innerHTML += "<li style='height: 400px;' id='slct2' name='slct2'><a href='#'><img class='fondo' src = '/arquivos/" + imagen + "' ; width='100%' /></a> <h2 id='article_blog'>" + filtro + "</h2><h6 id='fecha_blog'>" + fecha.substr(0, 10) + "</h6><p style='text-align: justify;'>" + contenido + "</p></li>";

      };

      //consolas....
    },
    error: function (jqXHR, textStatus, errorThrown) {
      datos = undefined;
    },
    cache: false
  });
}

function populate4(s5, s2) {

  var s5 = document.getElementById(s5);
  /* 	console.log(s1); */
  var s2 = document.getElementById(s2);
  s2.innerHTML = "";

  if (s5.value != "") {
    /* principal_blog.innerHTML="Hola como estas?"; */
    /* console.log("insertado"); */

    buscador_input();
  }

}

















//Botonoes de Filtro
function popular_get() {
  var datos_blog = document.getElementById("blog-page-body").value;

  //  poner el numero de paginas que contiene el documento pagination
  //inserta en el documento las paginas forzando el template a responder
  var slides_page = document.getElementById("slides");
  /*  console.log(slides_page); */
  slides_page.innerHTML = "";

  var blog_pages = slides_page.innerHTML += "<div><section id='list2'><nav><ul id='articulos1'></ul></nav><section></div>";
  /*  console.log(blog_pages); */



  $.ajax({
    url: '/api/dataentities/PB/search?_fields=titulo,contenido,fecha,filtro,pagina,imagen,estado&_where=(filtro=popular)',
    type: 'GET',
    success: function (data) {

      /*         console.log(data.length);
       */
      const principal_blog = document.getElementById('articulos1');
      /* console.log(principal_blog); */

      for (var i = 0; i < data.length; i++) {


        titulo = data[i].titulo;
        contenido = data[i].contenido;
        fecha = data[i].fecha;
        filtro = data[i].filtro;
        pagina = data[i].pagina;
        imagen = data[i].imagen;
        /*     console.log(data[i].titulo);
            console.log(data[i].contenido);
            console.log(data[i].fecha);
            console.log(data[i].filtro);
            console.log(data[i].pagina);
            console.log(data[i].imagen); */

        principal_blog.innerHTML += "<li style='height: 400px;' id='slct2' name='slct2'><a href='#'><img class='fondo' src = '/arquivos/" + imagen + "' ; width='100%' /></a> <h2 id='article_blog'>" + titulo + "</h2><h6 id='fecha_blog'>" + fecha.substr(0, 10) + "</h6><p style='text-align: justify;'>" + contenido + "</p></li>";

      };

      //consolas....
    },
    error: function (jqXHR, textStatus, errorThrown) {
      datos = undefined;
    },
    cache: false
  });
}

function populate1(s1, s2) {

  var s1 = document.getElementById(s1);
  /* 	console.log(s1); */
  var s2 = document.getElementById(s2);
  s2.innerHTML = "";

  if (s1.value == "Polular") {
    /*  s2.innerHTML="Hola como estas?";
     console.log("insertado"); */

    popular_get();
  }

}


function reciente_get() {
  var datos_blog = document.getElementById("blog-page-body").value;

  var slides_page = document.getElementById("slides");
  /*  console.log(slides_page); */
  slides_page.innerHTML = "";

  var blog_pages = slides_page.innerHTML += "<div><section id='list2'><nav><ul id='articulos1'></ul></nav><section></div>";
  /*  console.log(blog_pages); */



  $.ajax({
    url: '/api/dataentities/PB/search?_fields=titulo,contenido,fecha,filtro,pagina,imagen,estado&_where=(filtro=reciente)',
    type: 'GET',
    success: function (data) {

      const principal_blog = document.getElementById('articulos1');
      /*  console.log(principal_blog);
*/


      for (var i = 0; i < data.length; i++) {


        titulo = data[i].titulo;
        contenido = data[i].contenido;
        fecha = data[i].fecha;
        filtro = data[i].filtro;
        pagina = data[i].pagina;
        imagen = data[i].imagen;
        /*        console.log(data[i].titulo);
               console.log(data[i].contenido);
               console.log(data[i].fecha);
               console.log(data[i].filtro);
               console.log(data[i].pagina);
               console.log(data[i].imagen); */

        var articulos = principal_blog;
        articulos.innerHTML +=
          "<li style='height: 450px;' id='slct2' name='slct2'><a href='#'><img class='fondo' src = '/arquivos/" + imagen + "' ; width='100%' /></a> <h2 id='article_blog'>" + titulo + "</h2><h6 id='fecha_blog'>" + fecha.substr(0, 10) + "</h6><p style='text-align: justify;'>" + contenido + "</p></li>";

      };

      //consolas....
    },
    error: function (jqXHR, textStatus, errorThrown) {
      datos = undefined;
    },
    cache: false
  });
}


function populate2(s3, s2) {

  var s3 = document.getElementById(s3);
  /* 	console.log(s3); */
  var s2 = document.getElementById(s2);
  s2.innerHTML = "";
  if (s3.value == "Reciente") {
    /*  s2.innerHTML="Segunda Rama";
     console.log("insertado"); */
    reciente_get();
  }

}




function los_que_saben_get() {
  var datos_blog = document.getElementById("blog-page-body").value;
  /*  console.log(datos_blog) */

  var slides_page = document.getElementById("slides");
  /*  console.log(slides_page); */
  slides_page.innerHTML = "";

  var blog_pages = slides_page.innerHTML += "<div><section id='list2'><nav><ul id='articulos1'></ul></nav><section></div>";
  /*  console.log(blog_pages); */



  $.ajax({
    url: '/api/dataentities/PB/search?_fields=titulo,contenido,fecha,filtro,pagina,imagen,estado&_where=(filtro=los_que_saben)',
    type: 'GET',
    success: function (data) {

      const principal_blog = document.getElementById('articulos1');
      /*  console.log(principal_blog); */


      for (var i = 0; i < data.length; i++) {


        titulo = data[i].titulo;
        contenido = data[i].contenido;
        fecha = data[i].fecha;
        filtro = data[i].filtro;
        pagina = data[i].pagina;
        imagen = data[i].imagen;
        /*      console.log(data[i].titulo);
             console.log(data[i].contenido);
             console.log(data[i].fecha);
             console.log(data[i].filtro);
             console.log(data[i].pagina);
             console.log(data[i].imagen); */

        var articulos = principal_blog;
        articulos.innerHTML +=
          "<li style='height: 450px;' id='slct2' name='slct2'><a href='#'><img class='fondo' src = '/arquivos/" + imagen + "' ; width='100%' /></a> <h2 id='article_blog'>" + titulo + "</h2><h6 id='fecha_blog'>" + fecha.substr(0, 10) + "</h6><p style='text-align: justify;'>" + contenido + "</p></li>";

      };

      //consolas....
    },
    error: function (jqXHR, textStatus, errorThrown) {
      datos = undefined;
    },
    cache: false
  });
}

function populate3(s4, s2) {

  var s4 = document.getElementById(s4);
  /* 	console.log(s4); */
  var s2 = document.getElementById(s2);
  s2.innerHTML = "";
  if (s4.value == "Los que Saben") {
    /*  s2.innerHTML="Tercera Rama";
     console.log("insertado"); */
    los_que_saben_get();
  }

}

//Pagination




function blog_get() {

  //obtener todo el documento
  var datos_blog = document.getElementById("blog-page-body").value;
  /*   console.log(datos_blog); */

  //obtener solo datos de paginas activas
  const URL_search = "/api/dataentities/PB/search?_fields=pagina&_where=(estado=activo)";
  fetch(URL_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA", "X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN" } })
    .then(function (response) {
      return response.json()
    })

    .then(function (data2) {
      /*  console.log(data2.length); */

      //array vacio para meter datos
      const base_datos = []
      //Bucle que recorre todos los datos de la consulta a la Master Data
      for (var i = 0; i < data2.length; i++) {
        /* console.log(data2[i].pagina);  */
        base_datos.push(data2[i].pagina);
        /*  console.log(base_datos) */
        ;
      }
      const libro = new Set(base_datos);
      console.log(libro.size);
      cantidad_paginas = libro.size;
      console.log(cantidad_paginas);
      cantidad_value = document.getElementById("cantidad_paginas");
      cantidad_value.innerHTML = cantidad_paginas;
      cantidad_value.setAttribute("value", cantidad_paginas);



    });




  /* console.log(paginas); */


  cantidad_value2 = document.getElementById("cantidad_paginas");
  console.log(cantidad_value2);

  //  poner el numero de paginas que contiene el documento pagination
  //inserta en el documento las paginas forzando el template a responder
  var slides_page = document.getElementById("slides");
  /*  console.log(slides_page); */
  slides_page.innerHTML = "";
  b = 0;
  for (var a = 0; a < 10; a++) {
    b++;
    var blog_pages = slides_page.innerHTML += "<div><section id='list2'><nav><ul id='articulos" + b + "'></ul></nav><section></div>";
    /*  console.log(blog_pages); */
  }

  //tl buble while hace una seleccion de los articulos segun la pagina donde va
  //escogiendola desde la base de datos MASTER DATA 

  var n = 0;
  while (n < 10) {

    n++;
    const principal_blog = document.getElementById("articulos" + n)
    /*    console.log(principal_blog); */
    $.ajax({
      url: '/api/dataentities/PB/search?_fields=titulo,contenido,fecha,filtro,pagina,imagen,estado&_where=(estado=activo AND pagina=' + n + ')',
      type: 'GET',
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          titulo = data[i].titulo;
          contenido = data[i].contenido;
          fecha = data[i].fecha;
          filtro = data[i].filtro;
          pagina = data[i].pagina;
          imagen = data[i].imagen;
          /*    console.log(data[i].titulo);
          console.log(data[i].contenido);
          console.log(data[i].fecha);
          console.log(data[i].filtro);
          console.log(data[i].pagina);
          console.log(data[i].imagen);  */
          principal_blog.innerHTML += "<li style='height: 400px;' id='slct2' name='slct2'><a href='#'><img class='fondo' src = '/arquivos/" + imagen + "' ; width='100%' /></a> <h2 id='article_blog'>" + titulo + "</h2><h6 id='fecha_blog'>" + fecha.substr(0, 10) + "</h6><p style='text-align: justify;'>" + contenido + "</p></li>";
        };

        //consolas....
        /*  console.log(data.length); */


      },
      error: function (jqXHR, textStatus, errorThrown) {
        datos = undefined;
      },
      cache: false
    });

  };
}

blog_get();

var blog_config = {
  init: function () {
    var width = screen.width;
    this.pagination_blog();
    //this.addToCartWithVariation(skuJson.skus[0].sku);
    if (width < 767) {
    }
  },



  pagination_blog: function () {


    $("#slides").slidesjs({
      width: 590,
      height: 380,
      navigation: {
        effect: "fade"
      },
      pagination: {
        effect: "fade"
      },
      effect: {
        fade: {
          speed: 250
        }
      },
      play: {
        active: true,
        // [boolean] Generate the play and stop buttons.
        // You cannot use your own buttons. Sorry.
        effect: "fade",
        // [string] Can be either "slide" or "fade".
        interval: 5000,
        // [number] Time spent on each slide in milliseconds.
        auto: false,
        // [boolean] Start playing the slideshow on load.
        swap: true,
        // [boolean] show/hide stop and play buttons
        pauseOnHover: true,
        // [boolean] pause a playing slideshow on hover
        restartDelay: 300
        // [number] restart delay on inactive slideshow
      }


    });

    console.log('pagination');
  }
}

$(document).ready(function () {
  blog_config.init();
});
