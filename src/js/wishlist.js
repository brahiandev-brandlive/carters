vtexjs.checkout.getOrderForm().done(function (orderForm) {
	var userLogado = orderForm.loggedIn;
	if (userLogado) {
		console.log('Usuario logueado: ', orderForm.clientProfileData.email);
	} else {
		console.log('Usuario no logueado2');
	}

	setInterval(() => {
		var productID = document.querySelectorAll('#product-content .product-info .product-name #___rc-p-id')[0] ? document.querySelectorAll('#product-content .product-info .product-name #___rc-p-id')[0].value : null;
		// console.log(productID);

		const URL_search = "/api/dataentities/PA/search?_fields=productID&_where=(productID=" + productID + ")";
		fetch(URL_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA", "X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN" } })
			.then(function (response) {
				return response.json()
			})
			.then(function (data2) {
				// console.log(data2);

				if (data2.orderId) {

				} else {

				}
			});


	}, 5000);
});



/* test para la obtencion de datos desde PDP */
function ejecucion() {
	if (document.querySelectorAll("#product-page").length > 0) {
		var idp = document.querySelectorAll('#___rc-p-id');
		var sku = document.querySelectorAll('.sku-selector-container');
		var nombre = document.querySelectorAll(".product-details .productName");
		var imagen = document.querySelectorAll('#image-main');
		var activo = "activo";
		var email = "email"
		for (var i = 0; i < 1; i++) {
			imagen = imagen[0].src;
			idp = idp[0].value;
			sku = sku[0].textContent;
			nombre = nombre[0].textContent;
			ruta = window.location.href;
			email = "mail";
			activo = "activo"
		}
	}
}
/* 		setTimeout(function(){ ejecucion(); }, 2000);
 */

function salida_usuario() {
	if (document.querySelectorAll("#account-page").length > 0) {

		var d = document.querySelector(".vtex-account__menu nav a:last-child"); // Encuentra el elemento "p" en el sitio
		d.onclick = Logout; // Agrega función onclick al elemento                  
		function Logout() {

			setTimeout(function () {
				var salida = document.querySelectorAll(".vtex-modal__confirmation .vtex-button");
				/* console.log(salida[1]); */
				var boton_salida = salida[1];
				var f = document.querySelector(".vtex-modal__confirmation .vtex-button"); // Encuentra el elemento "p" en el sitio
				boton_salida.onclick = RemoveLog;
				function RemoveLog() {
					localStorage.removeItem("login:");
				}

			}, 100);
		}
	}
}

setTimeout(function () { salida_usuario(); }, 3000);

function ventanaperfil() {
	vtexjs.checkout.getOrderForm().done(function (orderForm) {
		if (document.querySelectorAll("#product-page").length > 0) {


			var userLogado = orderForm.loggedIn;
			if (userLogado) {
				console.log('Usuario logueado: ', orderForm.clientProfileData.email);
			} else {
				var boton_deseos = document.querySelectorAll(".wishlist");
				/* 	console.log(boton_deseos); */
				var url_redic = window.location.href
				var url_redic2 = url_redic.split('/');
				console.log(url_redic2);
				localStorage.setItem("favoritos:", url_redic2[3]);

				boton_deseos[1].innerHTML = "<a href='/login?ReturnUrl=" + url_redic2[3] + "/p'><img src='/arquivos/wishlist-icon-pdp.png?v=637575695864430000'>Agregar a lista de deseos.</a>";

			}


		}
	});

}
ventanaperfil();

function perfil() {
	if (document.querySelectorAll("#account-page").length > 0) {
		var email = document.querySelectorAll('.vtex-profile-form__profile-summary .mb8');
		for (var i = 0; i < 1; i++) {
			email = email[2].querySelector('.c-on-disabled').textContent;
			localStorage.setItem("login:", email);

		}
		if (localStorage.getItem("favoritos:")) {
			var url_producto = localStorage.getItem("favoritos:")
			setInterval(function () {
				window.location.href = "https://tuissco.myvtex.com/";

			}, 10);
			setTimeout(function () {
				localStorage.removeItem("favoritos:")
			}, 100);

		} else {
			return
		}


	}
}
setTimeout(function () { perfil(); }, 5000);

/* Fin de test para obtencion de datos de PDP */







function datos_ocultos() {
	if (document.querySelectorAll("#product-page").length > 0) {
		var input_deseo = document.getElementsByClassName("modal-deseos");
		input_deseo[0].style.display = "none";
	}
}
datos_ocultos();


const removeProductWhishlist = async (email, id, idp, sku, ruta, nombre, imagen, lista) => {
	const productElement = parseInt($(document).find('#articulos').length - 1)
	const enumeradorElement = $(document).find(`#enumerador_${lista.toLowerCase()}`)

	const data = {
		id,
		idp,
		sku,
		ruta,
		nombre,
		imagen,
		activo: false,
		email
	}

	const remove = await fetch('/api/dataentities/WH/documents',
		{
			method: 'PATCH',
			body: JSON.stringify(data),
			headers:
			{
				"Content-Type": "application/json",
				"X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA",
				"X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN"
			}
		}
	);

	const removeJson = await remove.json();

	if (removeJson.Message) {
		console.error('Error in Update', data)
	}

	enumeradorElement.html(`( ${ productElement } ) Productos`)
	if (productElement === 0) {
		enumeradorElement.remove()

		$(document).find(`#${ lista.toLowerCase() }`).html('<div class="notFoundProduct"><h2> No se encuentran productos 😢 </h2></div>')
	}

	$(document).find(`#${ lista.toLowerCase() } .product-${idp}`).fadeOut(300, () => {
		$(document).find(`#${ lista.toLowerCase() } .product-${idp}`).remove()
	});
}

async function pintarDeseos() {
	if (document.querySelectorAll("#deseos-page-body").length > 0) {
		// Set Loader
		loader($('.acordeon_deseos'))

		// Print List Accordion
		listAccordion();
	}
}

/**
 * Set Loader
 */

const loader = element => {
	$(element).html(`
		<div class="loader">
			<div class="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	`)
}

/**
 * Show List in Accordion
*/

const listAccordion = async () => {
	const vtexOrder = await vtexjs.checkout.getOrderForm();
	const { clientProfileData: { email } } = vtexOrder;
	const elementParentAccordion = $('.acordeon_deseos')
	const totalListElement = $('.total_listas')
	const searchUrlLists = `/api/dataentities/WH/search?_fields=id,nombre&_where=(tipo=LIST AND activo=True AND email=${ email })`;
	const searchList = await fetch(searchUrlLists)
	const searchListJson = await searchList.json();

	setTimeout(() => {
		if (searchList.status === 200) {
			elementParentAccordion.html('')

			// Print Default List Accordion
			elementParentAccordion.append(`
				<div class="accordionContainer">
					<button class='accordion' data-list='favoritos'>Mis Favoritos</button>
					<div class="iconsDefault">
						<span class="">
							<img src="/arquivos/edit-ico.png">
						</span>
						<span class="">
							<img src="/arquivos/delete-ico.png">
						</span>
					</div>
				</div>
				<span class='enumerador' id='enumerador_favoritos'></span>
				<div class='panel' id='favoritos'>
				</div>
			`)

			if (searchListJson.length) {
				searchListJson.forEach(element => {
					const nameList = element.nombre.toLowerCase()
					console.log('Element', element);

					// Append List
					elementParentAccordion.append(`
						<div class="accordionContainer">
							<button class='accordion' data-list='${nameList}'>
								${nameList.charAt(0).toUpperCase() + nameList.slice(1).replace('_', ' ') }
							</button>
							<div class="icons">
								<span class="edit" onclick="onEditList('${ nameList }', '${ element.id }')">
									<img src="/arquivos/edit-ico.png">
								</span>
								<span class="delete" onclick="onDeleteList('${ nameList }', '${ element.id }')">
									<img src="/arquivos/delete-ico.png">
								</span>
							</div>
						</div>
						<span class='enumerador' id='enumerador_${ nameList }'></span>
						<div class='panel' id='${nameList}'>
						</div>
					`)
				});

				// Total List
				totalListElement.html(`Total de listas encontradas ( ${searchListJson.length + 1} )`)
			} else {
				totalListElement.html(`Total de listas encontradas ( 1 )`)
			}

			// Init Carrousels Event
			const elementAccordion = $(document).find('.accordion')

			elementAccordion.map((index, element) => {
				$(element).on('click', (e) => onEventListAccordion(e))
			})
		}
	}, 3000);
}

// Edit List

const onEditList = (list, id) => {
	const modalElement = $(document).find('.modal-deseos');
	$(modalElement).find('#titulo-deseos').html(`<img src='/arquivos/mas-icon.png'></img> EDITAR LISTA`);
	$(modalElement).find('.entrada_listas_datos').html(`
		<input class="lista_name" value="${ list.charAt(0).toUpperCase() + list.slice(1).replace('_', ' ') }" spellcheck="false" data-ms-editor="true">
		<div class="update_lista" style="cursor: pointer;">OK</div>
	`)

	$(modalElement).find('.entrada_listas_datos .lista_name').focus()

	modalElement.css('display', 'flex');

	$(document).find('.update_lista').on('click', async () => {
		const nombre = $(document).find('.lista_name').val().replace(' ', '_')

		const data = {
			id,
			nombre
		}

		const remove = await fetch('/api/dataentities/WH/documents',
			{
				method: 'PATCH',
				body: JSON.stringify(data),
				headers:
				{
					"Content-Type": "application/json",
					"X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA",
					"X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN"
				}
			}
		);

		const removeJson = await remove.json();

		if (removeJson.Message) {
			console.error('Error in Update', data)
		}

		$(document).find('.entrada_listas_datos').html('<div class="modalResponse"><h2>Actualizado correctamente 🥳</h2></div>');
	})
}

// On Delete List

const onDeleteList = (list, id) => {
	const modalElement = $(document).find('.modal-deseos');
	$(modalElement).find('#titulo-deseos').html(`<img src='/arquivos/mas-icon.png'></img> ELIMINAR LISTA`);
	$(modalElement).find('.entrada_listas_datos').html(`
		<h2 style="margin-right: 1rem;">¿ Estás seguro de eliminar la lista <b> ${ list.charAt(0).toUpperCase() + list.slice(1).replace('_', ' ') } </b> ?</h2></br>
		<div class="delete_lista" style="cursor: pointer;">OK</div>
	`)

	modalElement.css('display', 'flex');

	$(document).find('.delete_lista').on('click', async () => {
		const data = {
			id,
			"activo": "False",
		}

		const remove = await fetch('/api/dataentities/WH/documents',
			{
				method: 'PATCH',
				body: JSON.stringify(data),
				headers:
				{
					"Content-Type": "application/json",
					"X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA",
					"X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN"
				}
			}
		);

		const removeJson = await remove.json();

		if (removeJson.Message) {
			console.error('Error in Update', data)
		}

		$(document).find('.entrada_listas_datos').html('<div class="modalResponse"><h2>Eliminado correctamente 🥳</h2></div>');
	})
}

/**
 * Event in List Accordion
*/

const onEventListAccordion = (e) => {
	const panelId = $(e.target).data('list')
	const elementPanel = $(document).find(`#${panelId}`)
	const elementEnumerador = $(document).find(`#enumerador_${panelId}`)
	// Toggle Active Class
	$(e.target).toggleClass('active')

	// Toggle Panel
	if ($(e.target).hasClass('active')) {

		// Set Loader
		loader(elementPanel)

		// Get Products to List
		productToList(panelId)

		elementPanel.css('display', 'flex')
		elementEnumerador.css('display', 'block')
	} else {
		elementPanel.css('display', 'none')
		elementEnumerador.css('display', 'none')
	}
}

/**
 * Get Products to List
*/
const productToList = async (panel) => {
	const vtexOrder = await vtexjs.checkout.getOrderForm();
	const { clientProfileData: { email } } = vtexOrder;

	const searchUrl = `/api/dataentities/WH/search?_fields=id,activo,idp,imagen,nombre,lista,ruta,sku&_where=(activo="true" AND tipo="PRODUCT" AND lista="${panel.toUpperCase()}" AND email="${email}")`;
	const search = await fetch(searchUrl)
	const searchJson = await search.json();
	const elementPanel = $(document).find(`#${panel}`)
	console.log('searchJson', searchJson)
	if (searchJson.length) {
		elementPanel.html('')
		$(document).find(`#enumerador_${panel}`).text(`( ${searchJson.length} ) Productos`);

		searchJson.forEach(element => {
			const { id, idp, sku, ruta, nombre, imagen, lista } = element

			const colors = sku.split('#')
			let htmlColors = ''

			colors.forEach(color => {
				if (color != 'Color') {
					htmlColors += `<a style='background: #${color};  border: 1px solid #9d9d9c; font-size: 0;width: 25px;height: 25px;border-radius: 50%;'> ${color} </a>`
				}
			})

			elementPanel.append(`
				<div id='articulos' class="product-${idp}">
					<li>
						<div>
							<a href="${ruta}">
								<img src="${imagen}"></img>
							</a>
							<span class='deleteProduct' onclick="removeProductWhishlist( '${email}', '${id}', '${idp}', '${sku}', '${ruta}', '${nombre}', '${imagen}', '${lista}' )">
								<img  width='20px' src='/arquivos/corazon.png'></img>
							</span>
						</div>
						<div class='.product-name a' style='margin-top: 1rem;text-align: justify;'>
							<a>${nombre}</a>
						</div>
						<h3>Color:</h3>
						<div style='display: flex;'>
							${htmlColors}
						</div>
					</li>
				</div>
			`)
		});
	} else {
		elementPanel.html('<div class="notFoundProduct"><h2> No se encuentran productos 😢 </h2></div>')
	}
}

/* Lista de Deseseos */
var ListaDeseos = {
	init: function () {
		var width = screen.width;
		this.FormularioDeseos();
		this.EnvioFormulario();
		this.Crear_nueva_lista();
		this.EntradaListas();
		this.RevivirFormularios();
		this.ReenvioDeseos();
	},

	RevivirFormularios: function () {
		$('.mis_deseos').on('click', function (c) {

			vtexjs.checkout.getOrderForm().done(function (orderForm) {
				var invocar_lista = document.getElementsByClassName("input-remplazo");
				invocar_lista[0].innerHTML = "<select  class='lista_name' name='select'><option selected='selected' value='FAVORITOS'>Mis Favoritos</option></select></div>";


				var email = orderForm.clientProfileData.email;
				const URL_search = '/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(activo=lista AND email=' + email + ')';
				fetch(URL_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA", "X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN" } })
					.then(function (response) {
						return response.json()
					})

					.then(function (data4) {

						/* console.log("DATA4:"+data4.length);  */


						var mis_listas = document.getElementsByClassName("lista_name");
						//array vacio para meter listas
						const base_datos_listas = []
						//Bucle que recorre todos los datos de la consulta a la Master Data
						for (var i = 0; i < data4.length; i++) {
							/*  console.log(data4[i].nombre);     */
							base_datos_listas.push(data4[i].nombre);
							/*  console.log(base_datos_listas)  */
							mis_listas[0].innerHTML += "<option  value=" + data4[i].idp + "-" + data4[i].nombre + ">" + data4[i].nombre.split('_').join(' ') + "</option>";
							;
						}
						const favoritos = new Set(base_datos_listas);
						/* 	 console.log(favoritos.size); */
						cantidad_listas = favoritos.size;
						/*  console.log(cantidad_listas); */
					});
			});

		});
	},






	EnvioFormulario: function () {
		$('.wishlist').on('click', async function (c) {
			const vtexOrder = await vtexjs.checkout.getOrderForm();
			const { clientProfileData: { email } } = vtexOrder;

			const elementList = $('.lista_name')
			const searchUrl = `/api/dataentities/WH/search?_fields=nombre&_where=(activo=true AND tipo=LIST AND email=${email})`;
			const searchList = await fetch(searchUrl)
			const searchListJson = await searchList.json();

			if (searchListJson.length) {
				searchListJson.forEach(element => {
					console.log('Element: ', element);
					const nameList = element.nombre.toLowerCase()
					elementList.append(`<option value="${element.nombre}">${nameList.charAt(0).toUpperCase() + nameList.slice(1).replace('_', ' ')}</option>`);
				});
			}

			var input_deseo = document.getElementsByClassName("modal-deseos");
			input_deseo[0].style.display = "flex";

		});
	},


	//Formualrio de Lista de Deseos Conexcion
	EntradaListas: function () {
		$('.hacer_lista').on('click', async function (c) {
			c.preventDefault();

			const lista = $('.lista_name').val();
			const elementList = $('.lista_name');
			const elementParentList = $('.entrada_listas_datos');
			const searchUrl = `/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(nombre="${lista}")`;
			const urlCreate = `/api/dataentities/WH/documents`;

			// Consultar Datos

			const searchList = await fetch(searchUrl)

			const searchListJson = await searchList.json();

			if (searchListJson.length) {
				var tituloDeseosELement = document.querySelector("#titulo-deseos");
				tituloDeseosELement.innerHTML = '<img src="/arquivos/mas-icon.png">LA LISTA YA EXISTE';
			} else {
				const vtexOrder = await vtexjs.checkout.getOrderForm();
				const { clientProfileData: { email } } = vtexOrder;
				const data = {
					"idp": null,
					"sku": null,
					"email": email,
					"nombre": elementList.val().toUpperCase(),
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




	//Formualrio de Lista de Deseos Conexcion
	ReenvioDeseos: function () {
		$('.hacer_lista').on('click', function (e) {
			vtexjs.checkout.getOrderForm().done(function (orderForm) {
				e.preventDefault();

				const datos_existentes = document.querySelector(".lista_name").value.toUpperCase().split(' ').join('_');
				const URL2_search = "/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(nombre=" + datos_existentes + ")";


				//Consultar Datos
				// 		fetch(URL2_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuisscl-DLOHXN", "X-VTEX-API-AppToken": "FHKPAMCDPXJIGNXUJIFMAQGOBWCHNEBGULVKIEWJFWWWAMJNGBZJHZRPAVNDKVQLVDNVSNMELWHDTKNONOALESYUUFKMQTZKGLAXZNVTPUXLSNVPIZPVUEGCESBMDZOR" } })
				// 			.then(function (response) {

				// 				return response.json()
				// 			})
				// 			.then(function (data_ex) {

				// 				if (data_ex.length) {
				// 					var remplazo2 = document.querySelector("#titulo-deseos");
				// 					remplazo2.innerHTML = '<img src="/arquivos/mas-icon.png">LA LISTA YA EXISTE';
				// 					setTimeout(function () { location.reload(); }, 2000);
				// 					return

				// 				} else {

				// 					var email2 = orderForm.clientProfileData.email;
				// 					const URL3_search = "/api/dataentities/WH/search?_fields=activo,idp,imagen,nombre,ruta,sku&_where=(email=" + email2 + " AND activo=lista)";

				// 					fetch(URL3_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuisscl-DLOHXN", "X-VTEX-API-AppToken": "FHKPAMCDPXJIGNXUJIFMAQGOBWCHNEBGULVKIEWJFWWWAMJNGBZJHZRPAVNDKVQLVDNVSNMELWHDTKNONOALESYUUFKMQTZKGLAXZNVTPUXLSNVPIZPVUEGCESBMDZOR" } })
				// 						.then(function (response) {

				// 							return response.json()
				// 						})
				// 						.then(function (data_lista) {


				// 							const base_paginas = []
				// 							for (var r = 0; r < data_lista.length; r++) {
				// 								integer_lista = parseInt(data_lista[r].idp);
				// 								base_paginas.push(integer_lista + 1);
				// 								;
				// 							}
				// 							const paginas = new Set(base_paginas);

				// 							var idp = base_paginas.sort();
				// 							const numero_mayor = []
				// 							numero_mayor.push(Math.max(...idp));
				// 							console.log(numero_mayor);
				// 							idp_mayor = parseInt(numero_mayor[0]) + 1;



				// 							idp = idp_mayor;
				// 							var sku = $('.sku-selector-container');
				// 							sku = sku[0].textContent;
				// 							var email = orderForm.clientProfileData.email;
				// 							email = email;
				// 							var nombre = $('.product-details .productName');
				// 							nombre = nombre[0].textContent;
				// 							var ruta = window.location.href;
				// 							var imagen = $('#image-main');
				// 							imagen = imagen[0].src;
				// 							var activo = $('.lista_name').val().toUpperCase().split(' ').join('_');


				// /* 			console.log("ID:",idp, "; SKU:",sku,"; Nombre:", nombre, "; URL:",ruta, ", Imagen", imagen, ", Estado:", activo);
				//  */			var datosToSave = {
				// 								"idp": idp,
				// 								"sku": sku,
				// 								"email": email,
				// 								"nombre": nombre,
				// 								"ruta": ruta,
				// 								"imagen": imagen,
				// 								"activo": activo
				// 							}
				// 							$.ajax({
				// 								url: '/api/dataentities/WH/documents',
				// 								data: JSON.stringify(datosToSave),
				// 								contentType: 'application/json; charset=utf-8',
				// 								type: 'POST',
				// 								success: function (data) {
				// 									console.log('success')

				// 									$('.mensaje').fadeIn();
				// 									$('.mensaje').empty().append('<h3>¡GRACIAS TU OPINION NOS INTERESA!</3>');
				// 									/* location.reload(true); */
				// 								},
				// 								error: function (error) {
				// 									console.log(error.responseText)
				// 									if (error.status == 400) {
				// 										var response = JSON.parse(error.responseText);
				// 										$('.mensaje').fadeIn();
				// 										if (response.Message == 'duplicated entry') {
				// 											$('.mensaje').empty().append('<p>ERROR DE FORMULARIO</p>');
				// 										} else {
				// 											$('.mensaje').empty().append('<p>Lo sentimos, ha ocurrido un error</p>');
				// 										}
				// 										setTimeout(function () {
				// 											$('.mensaje').fadeOut();
				// 										}, 5000)
				// 									}
				// 								}
				// 							})

				// 						});



				// 				}
				// 			});

			})
		});
	},

	//Formualrio de Lista de Deseos Conexcion
	FormularioDeseos: function () {
		$('.enviar_lista').on('click', function (e) {

			e.preventDefault();

			vtexjs.checkout.getOrderForm().done(function (orderForm) {
				e.preventDefault();
				const listElement = $('.lista_name');

				var idp = skuJson.productId;
				var sku = $('.sku-selector-container');
				sku = sku[0].textContent;
				var email = orderForm.clientProfileData.email;
				email = email;
				var nombre = $('.product-details .productName');
				nombre = nombre[0].textContent;
				var ruta = window.location.href;
				var imagen = $('#image-main');
				imagen = imagen[0].src;
				var activo = true;

				var datosToSave = {
					"idp": idp,
					"sku": sku,
					"email": email,
					"nombre": nombre,
					"ruta": ruta,
					"imagen": imagen,
					"activo": activo,
					"tipo": "PRODUCT",
					"lista": listElement.val()
				}

				$.ajax({
					url: '/api/dataentities/WH/documents',
					data: JSON.stringify(datosToSave),
					contentType: 'application/json; charset=utf-8',
					type: 'POST',
					success: function (data) {
						console.log('success')

						var ocultar_lista = document.getElementsByClassName("entrada_listas_datos");
						ocultar_lista[0].style.display = "none";
						$('#titulo-deseos').fadeIn();
						$('#titulo-deseos').empty().append('<img style="width:40px; height:40px;" src="/arquivos/exito-icon.png"></img><h3 style="font-size:12px">¡AGREGADO CON ÉXITO!</3>');
						setTimeout(function () {
							$('#titulo-deseos').fadeOut();
							location.reload(true);
						}, 10000)

					},
					error: function (error) {
						console.log(error.responseText)
						if (error.status == 400) {
							var response = JSON.parse(error.responseText);
							$('.mensaje').fadeIn();
							if (response.Message == 'duplicated entry') {
								$('.mensaje').empty().append('<p>ERROR DE FORMULARIO</p>');
							} else {
								$('.mensaje').empty().append('<p>Lo sentimos, ha ocurrido un error</p>');
							}
							setTimeout(function () {
								$('.mensaje').fadeOut();
							}, 5000)
						}
					}
				})
			})
		});
	},




	Crear_nueva_lista: function () {

		if (document.querySelectorAll("#product-page").length > 0) {
			var crear_lista = document.getElementsByClassName("input-remplazo");
			var ocultar_atributo = document.querySelectorAll(".deseo_crear");
			var mis_deseos = document.querySelectorAll(".mis_deseos");
			mis_deseos[0].style.display = "none";
			var boton_crear = document.getElementsByClassName("hacer_lista");
			boton_crear[0].style.display = "none";
			var enviar_datos = document.getElementsByClassName("enviar_lista");
			enviar_datos[0].style.display = "flex";

			$('.deseo_crear').on('click', function (c) {
				boton_crear[0].style.display = "flex";
				enviar_datos[0].style.display = "none";
				crear_lista[0].innerHTML = "<input placeholder='Crear un nueva lista' class='lista_name'></input>";
				ocultar_atributo[0].style.display = "block";
				mis_deseos[0].style.display = "block";

			});


			$('.mis_deseos').on('click', function (c) {
				boton_crear[0].style.display = "none";
				enviar_datos[0].style.display = "flex";
				ocultar_atributo[0].style.display = "block";
				mis_deseos[0].style.display = "none";

			});

		}
	}
};

/* FIN Lista de Deseos */
$(document).ready(function () {
	vtexjs.checkout.getOrderForm().done(function (orderForm) {
		var userLogado = orderForm.loggedIn;
		if (userLogado) {
			if (document.querySelectorAll("#product-page").length > 0) {
				ListaDeseos.init();
			}
			pintarDeseos();
		} else {
			return
		}
	});


});









function Cerrar_Ventanas() {


	if (document.querySelectorAll("#deseos-page-body").length > 0) {

		//Boton Cerrar Modal
		var p = document.querySelector(".close-modal"); // Encuentra el elemento "p" en el sitio
		p.onclick = cerrarModal; // Agrega función onclick al elemento                  
		function cerrarModal() {
			document.querySelector(".modal-deseos").style.display = "none";
			location.reload();
		}
	}




	if (document.querySelectorAll("#login-page").length > 0) {

		//Boton Cerrar Modal
		var p = document.querySelector(".close-login"); // Encuentra el elemento "p" en el sitio
		p.onclick = cerrarModal; // Agrega función onclick al elemento                  
		function cerrarModal() {
			window.location.href = "https://tuissco.myvtex.com/"
		}
	}


	if (document.querySelectorAll("#product-page").length > 0) {

		//Boton Cerrar Modal
		var p = document.querySelector(".close-modal"); // Encuentra el elemento "p" en el sitio
		p.onclick = cerrarModal; // Agrega función onclick al elemento
		function cerrarModal() {
			document.querySelector(".modal-deseos").style.display = "none";
			location.reload();
		}
	}
}

Cerrar_Ventanas();
