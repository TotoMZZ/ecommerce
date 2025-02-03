/* ------------------------------------ */
/*         variables globales           */
/* ------------------------------------ */



/* ------------------------------------ */
/*         funciones globales           */
/* ------------------------------------ */

function representarCardsProductos() {
    let cards = ''
    if (productos.length) {
        for (let i = 0; i < productos.length; i++) {
            let producto = productos[i]
            cards += `
                    <article class="card-${i + 1}">
                        <h2>${producto.nombre}</h2>
                        <img src="${producto.foto}" alt="foto de ${producto.nombre} ${producto.marca}">
                        <p><b>Precio:</b> $${producto.precio}</p>
                        <p><b>Stock:</b> ${producto.stock}</p>
                        <p><b>Marca:</b> ${producto.marca}</p>
                        <p><b>Categoria:</b> ${producto.categoria}</p>
                        <p><b>Descripcion Corta:</b> ${producto.descripcionCorta}</p>
                        <p><b>Descripcion Larga:</b> ${producto.descripcionLarga}</p>
                        <p><b>Edad desde:</b> ${producto.edadDesde}</p>
                        <p><b>Edad hasta:</b> ${producto.edadHasta}</p>
                        <br>
                        <p><b style="color:gold;">Envío:</b> ${producto.envio ? 'Si' : 'No'}</p>
                        <button onclick="agregarCarrito(${i})" class="buy-btn">Agregar</button>
                    </article>
                `
        }
    }
    else cards += '<h2>No se encontraron productos para mostrar</h2>'


    document.querySelector('.product-cards').innerHTML = cards
}

let carrito = [];
let total = 0

function agregarCarrito(index) {
    const productoSeleccionado = productos[index];
    const idProducto = productoSeleccionado.nombre;

    if (carrito[idProducto]) {
        carrito[idProducto].cantidad += 1;
    } else {
        carrito[idProducto] = { ...productoSeleccionado, cantidad: 1 };
    }

    mostrarCarrito();
}


function mostrarCarrito() {
    const carritoList = document.getElementById('probando');
    carritoList.innerHTML = '';

    let total = 0;
    const productosEnCarrito = Object.values(carrito);

    if (productosEnCarrito.length > 0) {
        productosEnCarrito.forEach((producto, index) => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const article = document.createElement('article');
            article.classList.add(`producto-${index + 1}`);

            article.innerHTML = `
                <img src="${producto.foto}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio unitario: $${producto.precio}</p>
                <p>
                    Cantidad: 
                    <button class="btn-sumar" data-producto="${producto.nombre}">+</button> 
                    <input type="number" value="${producto.cantidad}" class="cantidad-input" data-producto="${producto.nombre}" min="1"> 
                    <button class="btn-restar" data-producto="${producto.nombre}">-</button>
                </p>
                <p>Subtotal: $${subtotal}</p>
                <div class="btn-producto">
                    <button id="eliminar" onclick="eliminarProducto('${producto.nombre}')">Eliminar Todo</button>
                </div>
            `;

            carritoList.appendChild(article);
        });

        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: $${total}`;
    } else {
        carritoList.innerHTML = '<span>El carrito está vacío.</span>';
        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: $0`;
    }

    document.querySelectorAll('.btn-sumar').forEach(button => {
        button.addEventListener('click', () => {
            const productoNombre = button.getAttribute('data-producto');
            sumarCantidad(productoNombre);
        });
    });

    document.querySelectorAll('.btn-restar').forEach(button => {
        button.addEventListener('click', () => {
            const productoNombre = button.getAttribute('data-producto');
            restarCantidad(productoNombre);
        });
    });

    document.querySelectorAll('.cantidad-input').forEach(input => {
        input.addEventListener('blur', (event) => {
            const productoNombre = input.getAttribute('data-producto');
            const nuevaCantidad = parseInt(input.value, 10);
            if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                carrito[productoNombre].cantidad = nuevaCantidad; 
                mostrarCarrito();
                actualizarContadorCarrito();
            } else {
                alert("La cantidad debe ser un número mayor que 0.");
            }
        });
    });
}

function sumarCantidad(nombreProducto) {
    
    if (carrito[nombreProducto]) {
        carrito[nombreProducto].cantidad += 1;
        mostrarCarrito();
        actualizarContadorCarrito();
    }
}

function restarCantidad(nombreProducto) {
    
    if (carrito[nombreProducto] && carrito[nombreProducto].cantidad > 1) {
        carrito[nombreProducto].cantidad -= 1; 
        mostrarCarrito();
        actualizarContadorCarrito();
    } else if (carrito[nombreProducto] && carrito[nombreProducto].cantidad === 1) {
        eliminarProducto(nombreProducto);
    }
}



function start() {
    console.warn(document.querySelector('title').innerText)

    getAll(prods => {
        productos = prods
        representarCardsProductos()
    })


}

