//declaracion de variables

// let datos =[{
//     nombre:"felipe_salazar",
//     profesion:"auxiliar",
//     salario: 1800000
// },
// {
//     nombre:"carolinar",
//     profesion:"´programador",
//     salario: 1200000
// },
// {
//     nombre:"jorge",
//     profesion:"sistemas",
//     salario: 2000000
// },
// {
//     nombre:"miguel",
//     profesion:"jugador",
//     salario: 1500000
// }
// ]; 

// localStorage.setItem("info", JSON.stringify(datos))

// alert ("Datos Guardados Con Exito") 
//guardar la informacion el localstorage

/* localStorage.setItem("info", JSON.stringify(datos));

alert("datos guardados con exito"); */

// let informacion = JSON.parse(localStorage.getItem("info"));
// let info=[];

// if(informacion != null){
//     info = informacion;
// }

// info.forEach((d,i)=>{

//     document.write(
//         `id:${i+1}
//          nombre : ${d.nombre} <br>
//          profesion:${d.profesion}, <br>
//          salario: ${d.salario},
//          <hr>
//         `
//     ); 
// }); 



//eliminar la informacion de locarstorage

/* localStorage.removeItem("info");  */




//Declaracion De Variables Para el formulario........

/* 
let nombrePro = document.querySelector(".nombre-producto");
let precioPro = document.querySelector(".precio-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let imagenPro = document.querySelector(".imagen-producto");
let botonGuardar = document.querySelector(".btn-guardar"); */

//Evento para el boton Guardar

/* botonGuardar.addEventListener("click", function(){
    // alert(nombrePro.value)
    console.log(obtenerdatos())
}); */



//function para tomar los datos del formulario

/* function obtenerdatos(){
    let producto ={
        nombre: nombrePro.value,
        precio: precioPro.value,
        presentacion:presentacionPro.value,
        imagen: imagenPro.value
    }
    nombrePro.value="";
    precioPro.value="";
    presentacionPro.value="";
    imagenPro.value="";

    return producto;
}
 */


const d = document;
let productoInput = d.querySelector(".nombre-producto");
let precioInput = d.querySelector(".precio-producto");
let presentacionInput = d.querySelector(".presentacion-producto");
let imagenInput = d.querySelector(".imagen");
let btnGuardar= d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");


btnGuardar.addEventListener("click", ()=>{
    //alert(productoInput.value);
    let datos = validarFormulario();
    if(datos != null){
        guardarDatos(datos);
    }
    borrarTabla();
    mostrarDatos();
})

function validarFormulario() {
    let datosform;
    if (productoInput.value == "" || precioInput.value == "" || imagenInput.value == "") {
        alert("Todos Los Campos Son Obligatorios");
    } else {
        datosform = {
            producto: productoInput.value,
            precio: precioInput.value,
            presentacion: presentacionInput.value,
            imagen: imagenInput.value
        }
    
    console.log(datosform);

    productoInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    presentacionInput.value = "";

    return datosform;
   }
} 

//funcion para guardar los datos en locastorage
const listadoPedidos="pedidos"

function guardarDatos(datos){
    let pedidos=[];
    //extraer los datos guardados previamente en el localstorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos))
    //validar datos guardados previamente en el localstorage
    if(pedidosPrevios != null){
        pedidos=pedidosPrevios
    }
    //agregar el pedido nuevo al array
    pedidos.push(datos)
    //guardar en localstorage
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos))
    //validar que los datos fueron guardados
    alert ("Datos Guardados Con Exito")
}

// funcion para extraer los datos guardados previamente en el localstorage
function mostrarDatos() {
    let pedidos = [];
    // Extraer los datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    // Validar datos guardados previamente en el localStorage
    if (pedidosPrevios !== null) {
        pedidos = pedidosPrevios;
    }

    // Mostrar los datos en la tabla
    pedidos.forEach((p, i) => {
        if (p && p.producto) { // Verifica si p no es null ni undefined y si tiene la propiedad producto
            let fila = d.createElement("tr");
            fila.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.producto}</td>
                <td>${p.precio}</td>
                <td>${p.presentacion}</td>
                <td><img src="${p.imagen}" width="40%"></td>
                <td>
                    <span onclick="actualizarPedido(${i})" class="btn-editar btn-warning">✂️</span>
                    <span onclick="eliminarPedidos(${i})" class="btn-eliminar btn-warning">❌</span>
                </td>
            `;
            tabla.appendChild(fila);
        } else {
            console.error("El objeto es null, undefined o no tiene la propiedad 'producto':", p);
        }
    });
}

//quitar datos de la tabla
function borrarTabla(){
    let filas = d.querySelectorAll(".table tbody tr");
    //console.log(filas)
    filas.forEach((f)=>{
        f.remove();
    });
}

//funcion eliminar un pedido de la tabla

function eliminarPedidos(pos){
    let pedidos=[];
    //extraer los datos guardados previamente en el localstorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos))
    //validar datos guardados previamente en el localstorage
    if(pedidosPrevios != null){
        pedidos=pedidosPrevios
    }
    //confirmar pedido al eliminar
    let confirmar= confirm("Deseas Eliminar Este Elemento "+pedidos[pos]+"?");
    if(confirmar){
        //alert (" Lo Eliminaste")
        pedidos.splice(pos,1);
        alert("Has Eliminado El Producto Con Exito")
        // Guardar Los Datos Que Quedaron En El LocalStorage
        localStorage.setItem(listadoPedidos,JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
    }
}
//Actualizar Pedido o Editar

function actualizarPedido(pos){
    let pedidos=[];
    //extraer los datos guardados previamente en el localstorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos))
    //validar datos guardados previamente en el localstorage
    if(pedidosPrevios != null){
        pedidos=pedidosPrevios
    }
    //pasarlos datos al formulario
    productoInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    imagenInput.value = pedidos[pos].imagen;
    presentacionInput = pedidos[pos].presentacion;
    // boton actualizar
    let bntActualizar = d.querySelector (".btn-actualizar")     
    bntActualizar.classList.toggle("d-none")
    btnGuardar.classList.toggle("d-none")
    //agregar un evento  al boton actualizar
    bntActualizar.addEventListener("click",function(){
        pedidos[pos].pedidos= productoInput.value;
        pedidos[pos].precio = precioInput.value;
        pedidos[pos].imagen= imagenInput.value;
        pedidos[pos].presentacion= presentacionInput.value;
        
        //guardar los datos editados en localstorage
        localStorage.setItem(listadoPedidos,JSON.stringify(pedidos));
        alert ("el datos fue actualizado con exito!! 👍")

        productoInput.value = "";
        precioInput.value = "";
        presentacionInput.value = "";

        bntActualizar.classList.toggle("d-none")
        btnGuardar.classList.toggle("d-none")

        borrarTabla();
        mostrarDatos();
    });
}

// Obtener referencia al campo de búsqueda y al botón de búsqueda
let buscarInput = d.querySelector(".buscar");
let btnBuscar = d.getElementById("buscar");

// Verificar si el campo de búsqueda y el botón de búsqueda existen antes de continuar
if (buscarInput && btnBuscar) {
    // Agregar evento de clic al botón de búsqueda
    btnBuscar.addEventListener("click", function() {
        let term = buscarInput.value.trim().toLowerCase(); // Obtener el término de búsqueda en minúsculas

        // Obtener los pedidos guardados en localStorage
        let pedidos = JSON.parse(localStorage.getItem(listadoPedidos)) || [];

        // Filtrar los pedidos que coincidan con el término de búsqueda
        let pedidosFiltrados = pedidos.filter(pedido => {
            return pedido.producto.toLowerCase().includes(term); // Filtrar por el nombre del producto
        });

        // Limpiar la tabla
        borrarTabla();

        // Mostrar los pedidos filtrados en la tabla
        pedidosFiltrados.forEach((p, i) => {
            let fila = d.createElement("tr");
            fila.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.producto}</td>
                <td>${p.precio}</td>
                <td>${p.presentacion}</td>
                <td><img src="${p.imagen}" width="40%"></td>
                <td>
                    <span onclick="actualizarPedido(${i})" class="btn-editar btn-warning">✂️</span>
                    <span onclick="eliminarPedidos(${i})" class="btn-eliminar btn-warning">❌</span>
                </td>
            `;
            tabla.appendChild(fila);
        });
    });
}
