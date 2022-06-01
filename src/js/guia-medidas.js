//Boton Cerrar Modal
var p = document.querySelector(".close-verde"); // Encuentra el elemento "p" en el sitio
p.onclick = cerrarModal; // Agrega función onclick al elemento                  
function cerrarModal() {
document.querySelector(".modal-imagenes-verdes").style.display = "none";	
}


//Boton Cerrar Modal
var g = document.querySelector(".el_click"); // Encuentra el elemento "p" en el sitio
g.onclick = AbrirModal; // Agrega función onclick al elemento                  
function AbrirModal() {
document.querySelector(".modal-imagenes-verdes").style.display = "flex";	
}