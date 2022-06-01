function datos_ocultos() {
	var input_deseo = document.getElementsByClassName("modal-deseos");
	input_deseo[0].style.display = "none";
	var boton_editar = document.getElementById("editar-lista");
	boton_editar.style.display = "none";

}
datos_ocultos();



vtexjs.checkout.getOrderForm().done(function (orderForm) {
	var userLogado = orderForm.loggedIn;
	if (userLogado) {
		console.log('Usuario logueado: ', orderForm.clientProfileData.email);
	} else {
		var sesion_login = document.getElementsByClassName("total_listas");
		console.log(sesion_login);
		sesion_login[0].innerHTML = "<a href='login?ReturnUrl=favoritos'>Debes Iniciar Sesion Aqui.</a>"
	}
});

var EntradaListas_deseos = {
	init: function () {
		var width = screen.width;
		this.EntradaListas();
		this.EnvioFormulario();
		this.AcordeonDeseos();
		this.deleteListas();
		this.editarListas();
		this.cambiarNombre();

	},

	EnvioFormulario: function () {
		vtexjs.checkout.getOrderForm().done(function (orderForm) {
			var userLogado = orderForm.loggedIn;
			if (userLogado) {
				$('.deseo_crear').on('click', function (c) {
					var input_deseo = document.getElementsByClassName("modal-deseos");
					input_deseo[0].style.display = "flex";
				});
			} else {
				return
			}
		});
	},



	AcordeonDeseos: function () {

		// $('.deseo_listas').on('click', function (c) {

		// 	vtexjs.checkout.getOrderForm().done(function (orderForm) {
		// 		var userLogado = orderForm.loggedIn;
		// 		if (userLogado) {

		// 			var userLogado = orderForm.loggedIn;
		// 			console.log('Usuario logueado: ', orderForm.clientProfileData.email);



		// 			//Obtencion de Sesion desde LocalStrogage
		// 			var email = orderForm.clientProfileData.email;
		// 			const URL_search = '/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(email=' + email + ')';
		// 			fetch(URL_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuisscl-DLOHXN", "X-VTEX-API-AppToken": "FHKPAMCDPXJIGNXUJIFMAQGOBWCHNEBGULVKIEWJFWWWAMJNGBZJHZRPAVNDKVQLVDNVSNMELWHDTKNONOALESYUUFKMQTZKGLAXZNVTPUXLSNVPIZPVUEGCESBMDZOR" } })
		// 				.then(function (response) {
		// 					return response.json()
		// 				})
		// 				.then(function (data2) {
		// 					/* console.log(data2);   */


		// 					if (document.querySelectorAll(".deseos-page-body").length > 0) {
		// 						var mis_listas_document = document.getElementsByClassName("acordeon_deseos_2");
		// 						mis_listas_document[0].innerHTML = "";
		// 						var w = -1;
		// 						var accordion2_boton = document.getElementsByClassName("accordion");

		// 						/* console.log(mis_listas_document); */

		// 						var agrupacion_datos = data2;
		// 						const user_listas = agrupacion_datos.filter(function (agrupacion_datos) {
		// 							return agrupacion_datos.activo == "lista";
		// 						});
		// 						/* 	console.log(user_listas);  */



		// 						for (var i = 0; i < user_listas.length; i++) {

		// 							nombre = user_listas[i].nombre;
		// 							idp = user_listas[i].idp;
		// 							sku = user_listas[i].sku;
		// 							ruta = user_listas[i].ruta;
		// 							email = user_listas[i].email;
		// 							activo = user_listas[i].activo;
		// 							imagen = user_listas[i].imagen;
		// 							/*   console.log(data2[i].nombre);
		// 							  console.log(data2[i].idp);
		// 							  console.log(data2[i].sku);
		// 							  console.log(data2[i].ruta);
		// 							  console.log(data2[i].email);
		// 							  console.log(data2[i].activo);
		// 							  console.log(data2[i].imagen);  */

		// 							mis_listas_document[0].innerHTML += "<button  class='accordion'>" + nombre.split('_').join(' ') + "</button>	<div class='panel' id=" + idp + "></div><div class='iconos'><span class='ver_info" + nombre + "'><img src='/arquivos/ver-ico.png'></img></span><span class='edit_lista'><img src='/arquivos/edit-ico.png'></img></span><span class='ico_delete'><img src='/arquivos/delete-ico.png'></img></span></div>";
		// 							var ciclos_lista = document.getElementById(nombre);
		// 							/* console.log(ciclos_lista); */
		// 							nombre = user_listas[i].nombre;
		// 							identi = user_listas[i].idp;
		// 							const items_lista = agrupacion_datos.filter(function (agrupacion_datos) {
		// 								return agrupacion_datos.activo !== "lista" && agrupacion_datos.idp == idp;
		// 							});
		// 							console.log(items_lista);

		// 							/*  console.log(data3);  */

		// 							var nombre_temporal = user_listas[i].nombre;
		// 							$('.ico_delete').on('click', function () {
		// 								var boton_delete = document.getElementById("thank-you");
		// 								var titulo_delete = document.getElementById("titulo-deseos");
		// 								titulo_delete.innerHTML = "<img src='/arquivos/mas-icon.png'></img>ELIMINAR UNA LISTA"
		// 								boton_delete.style.display = "flex";
		// 								var modal_deseo = document.getElementsByClassName("modal-deseos");
		// 								var modal_deseo2 = document.getElementsByClassName("entrada_listas_datos");
		// 								modal_deseo[0].style.display = "flex";
		// 								modal_deseo2[0].innerHTML = "<select  class='lista_name' name='select'><option selected='selected' value='FAVORITOS'>Mis Listas favoritos</option></select></div>";

		// 								var email = orderForm.clientProfileData.email;
		// 								const URL_search = '/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(activo=lista AND email=' + email + ')';
		// 								fetch(URL_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuisscl-DLOHXN", "X-VTEX-API-AppToken": "FHKPAMCDPXJIGNXUJIFMAQGOBWCHNEBGULVKIEWJFWWWAMJNGBZJHZRPAVNDKVQLVDNVSNMELWHDTKNONOALESYUUFKMQTZKGLAXZNVTPUXLSNVPIZPVUEGCESBMDZOR" } })
		// 									.then(function (response) {
		// 										return response.json()
		// 									})

		// 									.then(function (data4) {

		// 										/* console.log("DATA4:"+data4.length);  */


		// 										var mis_listas = document.getElementsByClassName("lista_name");
		// 										//array vacio para meter listas
		// 										const base_datos_listas = []
		// 										//Bucle que recorre todos los datos de la consulta a la Master Data
		// 										for (var i = 0; i < data4.length; i++) {
		// 											/*  console.log(data4[i].nombre);     */
		// 											base_datos_listas.push(data4[i].nombre);
		// 											/*  console.log(base_datos_listas)  */
		// 											mis_listas[0].innerHTML += "<option  value=" + data4[i].idp + ">" + data4[i].nombre.split('_').join(' ') + "</option>";
		// 											;
		// 										}
		// 										const favoritos = new Set(base_datos_listas);
		// 										/* 	 console.log(favoritos.size); */
		// 										cantidad_listas = favoritos.size;
		// 										/*  console.log(cantidad_listas); */
		// 									});
		// 							});




		// 							$('.edit_lista').on('click', function () {
		// 								var boton_delete = document.getElementById("thank-you");
		// 								var titulo_editar = document.getElementById("titulo-deseos");
		// 								var contenedor = document.getElementsByClassName("content-modal-deseos");
		// 								titulo_editar.innerHTML = "<img src='/arquivos/mas-icon.png'></img>EDITAR UNA LISTA"
		// 								boton_delete.style.display = "none";
		// 								var modal_deseo = document.getElementsByClassName("modal-deseos");
		// 								var modal_deseo2 = document.getElementsByClassName("entrada_listas_datos");
		// 								modal_deseo[0].style.display = "flex";

		// 								modal_deseo2[0].innerHTML = "<select  class='lista_name' name='select'><option  value='FAVORITOS'>Lista a Editar</option></select></div>";
		// 								contenedor[0].style.height = "200px";
		// 								var modal_deseo2 = document.getElementsByClassName("entrada_listas_datos");
		// 								modal_deseo2[0].innerHTML += "<input  class='lista_name2' ></input>";
		// 								var boton_editar = document.getElementById("editar-lista");
		// 								boton_editar.style.display = "block";
		// 								modal_deseo2[0].style.flexDirection = "column";
		// 								modal_deseo2[0].style.width = "65%";
		// 								modal_deseo2[0].style.margin = "0 auto";



		// 								var email = orderForm.clientProfileData.email;
		// 								const URL_search = '/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(activo=lista AND email=' + email + ')';
		// 								fetch(URL_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuisscl-DLOHXN", "X-VTEX-API-AppToken": "FHKPAMCDPXJIGNXUJIFMAQGOBWCHNEBGULVKIEWJFWWWAMJNGBZJHZRPAVNDKVQLVDNVSNMELWHDTKNONOALESYUUFKMQTZKGLAXZNVTPUXLSNVPIZPVUEGCESBMDZOR" } })
		// 									.then(function (response) {
		// 										return response.json()
		// 									})

		// 									.then(function (data4) {

		// 										/* console.log("DATA4:"+data4.length);  */


		// 										var mis_listas = document.getElementsByClassName("lista_name");
		// 										//array vacio para meter listas
		// 										const base_datos_listas = []
		// 										//Bucle que recorre todos los datos de la consulta a la Master Data
		// 										for (var i = 0; i < data4.length; i++) {
		// 											/*  console.log(data4[i].nombre);     */
		// 											base_datos_listas.push(data4[i].nombre);
		// 											/*  console.log(base_datos_listas)  */
		// 											mis_listas[0].innerHTML += "<option  value=" + data4[i].idp + ">" + data4[i].nombre.split('_').join(' ') + "</option>";
		// 											;
		// 										}
		// 										const favoritos = new Set(base_datos_listas);
		// 										/* 	 console.log(favoritos.size); */
		// 										cantidad_listas = favoritos.size;
		// 										/*  console.log(cantidad_listas); */
		// 									});
		// 							});
		// 							w++;

		// 							for (var j = 0; j < items_lista.length; j++) {
		// 								nombre3 = items_lista[j].nombre;
		// 								idp3 = items_lista[j].idp;
		// 								sku3 = items_lista[j].sku;
		// 								sku3 = sku3.slice(5);
		// 								var sku_array = sku3.split("#");
		// 								ruta3 = items_lista[j].ruta;
		// 								email3 = items_lista[j].email;
		// 								activo3 = items_lista[j].activo;
		// 								imagen3 = items_lista[j].imagen;
		// 								/*   console.log(data2[i].nombre);
		// 								  console.log(data2[i].idp);
		// 								  console.log(data2[i].sku);
		// 								  console.log(data2[i].ruta);
		// 								  console.log(data2[i].email);
		// 								  console.log(data2[i].activo);
		// 								  console.log(data2[i].imagen);  */

		// 								var ciclos_lista = document.getElementById(idp3);
		// 								/* 	console.log(ciclos_lista); */
		// 								ciclos_lista.innerHTML += "<div id='articulos'  id='" + idp3 + "'><li><div> <a href='" + ruta3 + "'> <img src='" + imagen3 + "'></img></a><img  width='20px' src='/arquivos/corazon.png'></img></div><div class='.product-name a'   style='margin-top: 1rem;text-align: justify;'><a>" + nombre3 + "</a></div><h3>Color:</h3><div style='display: flex;'><a style='background: #" + sku_array[1] + ";  border: 1px solid #9d9d9c; font-size: 0;width: 25px;height: 25px;border-radius: 50%;'>" + sku_array[1] + "</a><a style='background: #" + sku_array[2] + ";  border: 1px solid #9d9d9c; font-size: 0;width: 25px;height: 25px;border-radius: 50%;'>" + sku_array[2] + "</a><a style='background: #" + sku_array[3] + ";  border: 1px solid #9d9d9c; font-size: 0;width: 25px;height: 25px;border-radius: 50%;'>" + sku_array[3] + "</a></div></li></div>";

		// 							};


		// 							accordion2_boton[w].innerHTML += "<span class='enumerador'>(" + items_lista.length + ") productos</span>";




		// 						};

		// 						//array vacio para meter datos
		// 						const base_datos = []
		// 						//Bucle que recorre todos los datos de la consulta a la Master Data
		// 						for (var i = 0; i < user_listas.length; i++) {
		// 							/* console.log(data2[i].pagina);  */
		// 							base_datos.push(user_listas[i].nombre);
		// 							/*  console.log(base_datos) */
		// 							;
		// 						}
		// 						var titulo_mislitas = document.getElementsByClassName("total_listas");

		// 						const categorias = new Set(base_datos);
		// 						// console.log(categorias);
		// 						// console.log(categorias.size);
		// 						cantidad_categorias = categorias.size;
		// 						/* 	console.log(cantidad_categorias); */
		// 						titulo_mislitas[0].innerHTML = "<h5>Total listas encontradas(" + cantidad_categorias + ")</h5>";






		// 						//Funcionalidad de Acordeon
		// 						var acc = document.getElementsByClassName("accordion");
		// 						var i;
		// 						for (i = 0; i < acc.length; i++) {
		// 							acc[i].addEventListener("click", function () {
		// 								this.classList.toggle("active");
		// 								var panel = this.nextElementSibling;
		// 								if (panel.style.maxHeight) {
		// 									panel.style.maxHeight = null;
		// 								} else {
		// 									panel.style.maxHeight = panel.scrollHeight + "px";
		// 								}
		// 							});
		// 						}


		// 					};

		// 				});

		// 		}


		// 	});


		// });

	},

	deleteListas: function () {

		vtexjs.checkout.getOrderForm().done(function (orderForm) {
			var boton_delete = document.getElementById("thank-you");
			boton_delete.style.display = "none";

			$('.delete_lista').on('click', function (f) {
				f.preventDefault();

				id_lista = $('.lista_name').val();
				email = orderForm.clientProfileData.email;

				var datosFav = {
					"email": email,
					"nombre": nombre
				}
				$.ajax({
					url: '/api/dataentities/WH/documents/?_where=(idp=' + id_lista + ' AND email=' + email + ' AND activo=lista)',
					data: JSON.stringify(datosFav),
					contentType: 'application/json; charset=utf-8',
					type: 'DELETE',
					success: function (data) {
						console.log('success')
						var input_deseo = document.getElementsByClassName("modal-deseos");
						var input_deseo2 = document.getElementsByClassName("entrada_listas_datos");
						input_deseo[0].style.display = "flex";
						input_deseo2[0].style.display = "none";
						var boton_delete = document.getElementById("thank-you");
						boton_delete.style.display = "none";
						$('#titulo-deseos').fadeIn();
						$('#titulo-deseos').empty().append('<img style="width:40px; height:40px;" src="/arquivos/exito-icon.png"></img><h3 style="font-size:12px">¡LISTA ELIMINADA CON ÉXITO!</3>');
						setTimeout(function () {
							$('#titulo-deseos').fadeOut();
							location.reload(true);
						}, 5000)

					},
					error: function (error) {
						console.log(error.responseText)
						if (error.status == 400) {
							var response = JSON.parse(error.responseText);
							$('#button-submit').fadeIn();
							if (response.Message == 'duplicated entry') {
								$('#button-submit').empty().append('<p>ERROR</p>');
							} else {
								$('#button-submit').empty().append('<p>Lo sentimos</p>');

							}
							setTimeout(function () {
								$('#button-submit').fadeOut();

							}, 1000)
						}
					}
				})
			});
		});
	},

	cambiarNombre: function () {
		$('.edit_lista2').on('click', function (f) {
			f.preventDefault();

		});

	},


	editarListas: function () {

		vtexjs.checkout.getOrderForm().done(function (orderForm) {

			var boton_delete = document.getElementById("thank-you");
			boton_delete.style.display = "none";

			$('.edit_lista').on('click', function (f) {
				f.preventDefault();


				nombre_edit = $('.lista_name').val();
				nombre3 = $('.lista_name2').val().toUpperCase().split(' ').join('_');
				console.log(nombre_edit, nombre3);

				email = orderForm.clientProfileData.email;

				var datosFav = {

					"idp": $('.lista_name').val(),
					"sku": "NAN",
					"email": email,
					"nombre": nombre3,
					"ruta": "NAN",
					"imagen": "NAN",
					"activo": "lista"
				}
				$.ajax({
					url: '/api/dataentities/WH/documents/?_where=(idp=' + nombre_edit + ' AND email=' + email + ' AND activo=lista)',
					data: JSON.stringify(datosFav),
					contentType: 'application/json; charset=utf-8',
					type: 'PUT',
					success: function (data6) {
						console.log(data6);
						console.log('success')
						var input_deseo = document.getElementsByClassName("modal-deseos");
						var input_deseo2 = document.getElementsByClassName("entrada_listas_datos");
						input_deseo[0].style.display = "flex";
						input_deseo2[0].style.display = "none";
						var boton_delete = document.getElementById("thank-you");
						boton_delete.style.display = "none";

						var input_deseo3 = document.getElementById("editar-lista");
						input_deseo3.style.display = "none";

						var contenedor = document.getElementsByClassName("content-modal-deseos");
						contenedor[0].style.height = "150px";
						$('#titulo-deseos').fadeIn();
						$('#titulo-deseos').empty().append('<img style="width:40px; height:40px;" src="/arquivos/exito-icon.png"></img><h3 style="font-size:12px">¡LISTA EDITADA CON ÉXITO!</3>');
						/* 	setTimeout(function(){
								$('#titulo-deseos').fadeOut();
								location.reload(true);
							},5000) */

					},
					error: function (error) {
						console.log(error.responseText)
						if (error.status == 400) {
							var response = JSON.parse(error.responseText);
							$('#button-submit').fadeIn();
							if (response.Message == 'duplicated entry') {
								$('#button-submit').empty().append('<p>ERROR</p>');
							} else {
								$('#button-submit').empty().append('<p>Lo sentimos</p>');

							}
							setTimeout(function () {
								$('#button-submit').fadeOut();

							}, 1000)
						}
					}
				})




				id_lista = $('.lista_name').val();
				email = orderForm.clientProfileData.email;

				var datosFav = {
					"email": email,
					"nombre": nombre
				}
				$.ajax({
					url: '/api/dataentities/WH/documents/?_where=(idp=' + id_lista + ' AND email=' + email + ' AND activo=lista)',
					data: JSON.stringify(datosFav),
					contentType: 'application/json; charset=utf-8',
					type: 'DELETE',
					success: function (data) {
						console.log('success')
						var input_deseo = document.getElementsByClassName("modal-deseos");
						var input_deseo2 = document.getElementsByClassName("entrada_listas_datos");

						input_deseo[0].style.display = "flex";
						input_deseo2[0].style.display = "none";
						var input_deseo3 = document.getElementById("editar-lista");
						input_deseo3.style.display = "none";

						var contenedor = document.getElementsByClassName("content-modal-deseos");
						contenedor[0].style.height = "150px";
						var boton_delete = document.getElementById("thank-you");
						boton_delete.style.display = "none";
						$('#titulo-deseos').fadeIn();
						$('#titulo-deseos').empty().append('<img style="width:40px; height:40px;" src="/arquivos/exito-icon.png"></img><h3 style="font-size:12px">¡LISTA EDITADA CON ÉXITO!</3>');

						setTimeout(function () {
							$('#titulo-deseos').fadeOut();
							location.reload(true);
						}, 5000)

					},
					error: function (error) {
						console.log(error.responseText)
						if (error.status == 400) {
							var response = JSON.parse(error.responseText);
							$('#button-submit').fadeIn();
							if (response.Message == 'duplicated entry') {
								$('#button-submit').empty().append('<p>ERROR</p>');
							} else {
								$('#button-submit').empty().append('<p>Lo sentimos</p>');

							}
							setTimeout(function () {
								$('#button-submit').fadeOut();

							}, 1000)
						}
					}
				});






			});
		});
	},

	//Formualrio de Lista de Deseos Conexcion
	EntradaListas: function () {
		$('.hacer_lista').on('click', async function (c) {
			c.preventDefault();

			const vtexOrder = await vtexjs.checkout.getOrderForm();
			const { clientProfileData: { email } } = vtexOrder;
			const lista = $('.lista_name').val();
			const elementList = $('.lista_name');
			const elementParentList = $('.entrada_listas_datos');
			const searchUrl = `/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(email=${ email } AND activo="True" AND tipo=LIST AND nombre=${ lista.replace(' ', '_') })`;
			const urlCreate = `/api/dataentities/WH/documents`;

			// Consultar Datos

			const searchList = await fetch(searchUrl)

			const searchListJson = await searchList.json();

			if (searchListJson.length) {
				var tituloDeseosELement = document.querySelector("#titulo-deseos");
				tituloDeseosELement.innerHTML = '<img src="/arquivos/mas-icon.png">LA LISTA YA EXISTE';
			} else {
				const data = {
					"idp": null,
					"sku": null,
					"email": email,
					"nombre": elementList.val().toUpperCase().replace(' ', '_'),
					"ruta": null,
					"imagen": null,
					"activo": true,
					"lista": null,
					"tipo": 'LIST'
				}

				const createList = await fetch(urlCreate, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });

				if (createList.status != 201) {
					console.error('Error in Creation of List')

					return;
				}

				console.info('List Created')
				elementParentList.hide()
				$('#titulo-deseos').fadeIn();
				$('#titulo-deseos').empty().append('<img style="width:40px; height:40px;" src="/arquivos/exito-icon.png"></img><h3 style="font-size:12px">¡AGREGADO CON ÉXITO!</3>');
				setTimeout(function () {
					$('#titulo-deseos').fadeOut();
					location.reload(true);
				}, 10000)
			}
		})
	},
}

/* FIN Lista de Deseos */
$(document).ready(function () {
	EntradaListas_deseos.init();

});






