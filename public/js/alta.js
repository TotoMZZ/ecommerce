function agregar(e) {
    e.preventDefault();

    console.log('agregar()');

    let refNombre = document.getElementById('nombre');
    let refPrecio = document.getElementById('precio');
    let refStock = document.getElementById('stock');
    let refMarca = document.getElementById('marca');
    let refCategoria = document.getElementById('categoria');
    let refDescripcionCorta = document.getElementById('descripcion-corta');
    let refDescripcionLarga = document.getElementById('descripcion-larga');
    let refEdadDesde = document.getElementById('edad-desde');
    let refEdadHasta = document.getElementById('edad-hasta');
    let refFoto = document.getElementById('foto');
    let refEnvio = document.getElementById('envio');

    let nombre = refNombre.value;
    let precio = parseFloat(refPrecio.value) || 0;
    let stock = parseInt(refStock.value) || 0;
    let marca = refMarca.value;
    let categoria = refCategoria.value;
    let descripcionCorta = refDescripcionCorta.value;
    let descripcionLarga = refDescripcionLarga.value;
    let edadDesde = parseInt(refEdadDesde.value) || 0;
    let edadHasta = parseInt(refEdadHasta.value) || 0;
    let foto = refFoto.value;
    let envio = refEnvio.checked;

    let producto = {
        nombre: nombre,
        precio: precio,
        stock: stock,
        marca: marca,
        categoria: categoria,
        descripcionCorta: descripcionCorta,
        descripcionLarga: descripcionLarga,
        edadDesde: edadDesde,
        edadHasta: edadHasta,
        foto: foto,
        envio: envio,
    };


    fetch('https://675ccd73fe09df667f64befc.mockapi.io/api/productos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
    })
        .then(response => response.json())
        .then(data => {
            productos.push(data);
            representarTablaProductos();
            limpiarFormulario();
        })
        .catch(error => {
            console.error('Error al agregar producto:', error);
        });
}


function representarTablaProductos() {
    let filasTabla = '';

    if (productos.length) {
        filasTabla += `
            <tr>
                <th>ID</th>
                <th>nombre</th>
                <th>precio</th>
                <th>stock</th>
                <th>marca</th>
                <th>categoria</th>
                <th>descripcion corta</th>
                <th>descripcion larga</th>
                <th>edad desde</th>
                <th>edad hasta</th>
                <th>foto</th>
                <th>envío</th>
                <th></th>
            </tr>
        `;

        productos.forEach(producto => {
            filasTabla += `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.descripcionCorta}</td>
                    <td>${producto.descripcionLarga}</td>
                    <td>${producto.edadDesde}</td>
                    <td>${producto.edadHasta}</td>
                    <td><img width="75" src="${producto.foto}" alt="foto de ${producto.nombre}"></td>
                    <td>${producto.envio ? 'Sí' : 'No'}</td>
                    <td>
                        <button class="editar-btn" data-id="${producto.id}" id="editar-btn-${producto.id}" data-id="${producto.id}">Editar</button>
                        <button class="borrar-btn" id="borrar-btn-${producto.id}" data-id="${producto.id}">Borrar</button>
                    </td>
                </tr>
            `;
        });
    } else {
        filasTabla += '<h2>No se encontraron productos para mostrar</h2>';
    }

    document.querySelector('table').innerHTML = filasTabla;


    productos.forEach(producto => {
        document.getElementById(`editar-btn-${producto.id}`).addEventListener('click', () => {
            cargarProductoEnFormulario(parseFloat(producto.id));
        });

        document.getElementById(`borrar-btn-${producto.id}`).addEventListener('click', () => {
            borrarProducto(producto.id)
        });
    });


}

function cargarProductoEnFormulario(id) {
    let producto = productos.find(producto => producto.id === id);

    if (producto) {


        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('marca').value = producto.marca;
        document.getElementById('categoria').value = producto.categoria;
        document.getElementById('descripcion-corta').value = producto.descripcionCorta;
        document.getElementById('descripcion-larga').value = producto.descripcionLarga;
        document.getElementById('edad-desde').value = producto.edadDesde;
        document.getElementById('edad-hasta').value = producto.edadHasta;
        document.getElementById('foto').value = producto.foto;
        document.getElementById('envio').checked = producto.envio;


        document.getElementById('alta-form').setAttribute('data-id', parseFloat(producto.id));


        let guardarBtn = document.getElementById('guardar-btn');
        guardarBtn.innerText = 'Actualizar Producto';
        guardarBtn.classList.add('actualizar');


        document.getElementById(`borrar-btn-${producto.id}`).disabled = true;
        document.getElementById(`borrar-btn-${producto.id}`).style.backgroundColor = '#f8d7da';


        let editarBtn = document.getElementById(`editar-btn-${producto.id}`);
        editarBtn.textContent = 'Cancelar';
        editarBtn.style.backgroundColor = '#ff9800';
        editarBtn.style.border = '1px solid #ff9800';


        let botonesEditar = document.querySelectorAll('.editar-btn');
        botonesEditar.forEach(btn => {
            if (btn.id !== editarBtn.id) {
                btn.disabled = true;
                btn.style.backgroundColor = '#f0f0f0';
            }
        });


        let botonesBorrar = document.querySelectorAll('.borrar-btn');
        botonesBorrar.forEach(btn => {
            if (btn.id !== `borrar-btn-${producto.id}`) {
                btn.disabled = true;
                btn.style.backgroundColor = '#f8d7da';
            }
        });


        editarBtn.addEventListener('click', function cancelarEdicion() {

            editarBtn.textContent = 'Editar';
            editarBtn.style.backgroundColor = '#4CAF50';
            editarBtn.style.border = '1px solid #4CAF50';


            document.getElementById(`borrar-btn-${producto.id}`).disabled = false;


            limpiarFormulario();


            botonesEditar.forEach(btn => {
                btn.disabled = false;
                btn.style.backgroundColor = '#4CAF50';
            });

            botonesBorrar.forEach(btn => {
                btn.disabled = false;
                btn.style.backgroundColor = 'red';
            });


            editarBtn.removeEventListener('click', cancelarEdicion);


            editarBtn.addEventListener('click', () => {
                cargarProductoEnFormulario(parseFloat(producto.id));
            });
        });
    }
}






function editarProducto(id) {
    let producto = obtenerProductoPorId(id);
    if (producto) {

        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('marca').value = producto.marca;
        document.getElementById('categoria').value = producto.categoria;
        document.getElementById('descripcion-corta').value = producto.descripcionCorta;
        document.getElementById('descripcion-larga').value = producto.descripcionLarga;
        document.getElementById('edad-desde').value = producto.edadDesde;
        document.getElementById('edad-hasta').value = producto.edadHasta;
        document.getElementById('foto').value = producto.foto;
        document.getElementById('envio').checked = producto.envio;



        window.productoEditandoId = producto.id;
    }
}

document.getElementById('guardar-btn').addEventListener('click', guardarCambios);

function guardarCambios(e) {
    e.preventDefault();

    let id = parseFloat(document.getElementById('alta-form').getAttribute('data-id'), 10);


    id = parseFloat(id, 10);

    if (isNaN(id)) {
        agregar(e);
    } else {

        let producto = productos.find(producto => producto.id === id);


        producto.nombre = document.getElementById('nombre').value;
        producto.precio = parseFloat(document.getElementById('precio').value) || 0;
        producto.stock = parseInt(document.getElementById('stock').value) || 0;
        producto.marca = document.getElementById('marca').value;
        producto.categoria = document.getElementById('categoria').value;
        producto.descripcionCorta = document.getElementById('descripcion-corta').value;
        producto.descripcionLarga = document.getElementById('descripcion-larga').value;
        producto.edadDesde = parseInt(document.getElementById('edad-desde').value) || 0;
        producto.edadHasta = parseInt(document.getElementById('edad-hasta').value) || 0;
        producto.foto = document.getElementById('foto').value;
        producto.envio = document.getElementById('envio').checked;


        fetch(`https://675ccd73fe09df667f64befc.mockapi.io/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        })
            .then(response => {
                
                if (!response.ok) {
                    console.error('Error al actualizar el producto:', response.status, response.statusText);
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error detectado en la solicitud:', error);
            })

            .then(data => {
                


                productos = productos.map(p => (p.id === id ? data : p));


                


                cargarProductoEnFormulario(parseFloat(id));


                representarTablaProductos();


                limpiarFormulario();
            })
            .catch(error => {
                console.error('Error al actualizar el producto:', error);
            });
    }
}



function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('descripcion-corta').value = '';
    document.getElementById('descripcion-larga').value = '';
    document.getElementById('edad-desde').value = '';
    document.getElementById('edad-hasta').value = '';
    document.getElementById('foto').value = '';
    document.getElementById('envio').checked = false;


    document.getElementById('guardar-btn').innerText = 'Agregar Producto';


    document.getElementById('alta-form').removeAttribute('data-id');

    document.getElementById('guardar-btn').classList.remove('actualizar');

}

function borrarProducto(id) {
    let productoIndex = productos.findIndex(producto => producto.id === id);

    if (confirm('¿Estás seguro de que deseas eliminar el producto?')) {
        if (productoIndex !== -1) {
            fetch(`https://675ccd73fe09df667f64befc.mockapi.io/api/productos/${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(() => {
                    
                    productos.splice(productoIndex, 1);
                    representarTablaProductos();
                })
                .catch(error => {
                    console.error('Error al borrar producto:', error);
                });
        }
    }
}


function obtenerProductoPorId(id) {
    return productos.find(producto => producto.id === id);
}


let productoSeleccionado = obtenerProductoPorId();


function start() {
    fetch('https://675ccd73fe09df667f64befc.mockapi.io/api/productos/')
        .then(response => response.json())
        .then(data => {
            productos = data;


            productos.forEach((producto, index) => {
                producto.id = index + 1;
            })

            
            representarTablaProductos();
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

    document.querySelectorAll('.editar-btn').forEach(button => {
        button.addEventListener('click', function () {
            let idProducto = button.getAttribute('data-id');
            
            cargarProductoEnFormulario(parseFloat(idProducto));
        });
    });
}

document.addEventListener('DOMContentLoaded', start);



