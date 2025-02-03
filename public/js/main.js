const openModal = document.getElementById('open')
const modal_container = document.getElementById('modal_container')
const closeModal = document.getElementById('close')

openModal.addEventListener('click', () => {
    modal_container.classList.add('show')
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modal_container.classList.remove('show')
    }
});

closeModal.addEventListener('click', () => {
    modal_container.classList.remove('show')
})

const cartCount = document.getElementById('cart-count')

function showCartCount() {
    cartCount.classList.add('show')
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('cart-count');

    
    const totalCantidad = Object.values(carrito).reduce((acc, prod) => acc + prod.cantidad, 0);

    contador.textContent = totalCantidad;

    if (totalCantidad === 0) {
        contador.classList.remove('show');
    } else {
        contador.classList.add('show');
    }
}

function agregarCarrito(index) {
    const productoSeleccionado = productos[index];
    const idProducto = productoSeleccionado.nombre;

    if (carrito[idProducto]) {
        carrito[idProducto].cantidad += 1;
    } else {
        carrito[idProducto] = { ...productoSeleccionado, cantidad: 1 };
    }

    mostrarCarrito();
    actualizarContadorCarrito();
}


function eliminarProducto(nombreProducto) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el producto "${nombreProducto}" del carrito?`);
    
    if (confirmacion) {
        
        if (carrito[nombreProducto]) {
            
            delete carrito[nombreProducto];

            
            mostrarCarrito();
            actualizarContadorCarrito();
        }
    }
}

if (window.location.pathname === '/index.html') {

    let liInicio = document.getElementById('li-inicio')
    let aInicio = document.getElementById('a-inicio')

    liInicio.style.transform = 'scale(1.1)'
    aInicio.style.backgroundColor = 'rgb(116, 116, 116)'
    aInicio.style.borderRadius = '5px'

}

if (window.location.pathname === '/alta.html') {
    let liAlta = document.getElementById('li-alta')
    let aAlta = document.getElementById('a-alta')
    
    liAlta.style.transform = 'scale(1.1)'
    aAlta.style.backgroundColor = 'rgb(116, 116, 116)'
    aAlta.style.borderRadius = '5px'
}

if (window.location.pathname === '/contacto.html') {
    let liContacto = document.getElementById('li-contacto')
    let aContacto = document.getElementById('a-contacto')
    
    liContacto.style.transform = 'scale(1.1)'
    aContacto.style.backgroundColor = 'rgb(116, 116, 116)'
    aContacto.style.borderRadius = '5px'
}

if (window.location.pathname === '/nosotros.html') {
    let liNosotros = document.getElementById('li-nosotros')
    let aNosotros = document.getElementById('a-nosotros')
    
    liNosotros.style.transform = 'scale(1.1)'
    aNosotros.style.backgroundColor = 'rgb(116, 116, 116)'
    aNosotros.style.borderRadius = '5px'
}

/* ------------------------------------ */
/*              ejecucion               */
/* ------------------------------------ */
//start()
window.onload = start
  
  