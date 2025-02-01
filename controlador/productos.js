import Servicio from '../servicio/productos.js'


class Controlador {
    constructor(){
        this.servicio = new Servicio()
    }

    obtenerProducto = async (req, res) => {
        const { id } = req.params
        const productos = await this.servicio.obtenerProducto(id)
        res.json(productos)
    }

    guardarProducto = async (req, res) => {
        const producto = req.body
        const productoGuardado = await this.servicio.guardarProducto(producto)
        res.json(productoGuardado)
    }

    actualizarProducto = async (req, res) => {
        const { id } = req.params
        const producto = req.body
        const productoActualizado = await this.servicio.actualizarProducto(id, producto)
        res.json(productoActualizado)
    }

    borrarProducto = async (req, res) => {
        const { id } = req.params
        const productoEliminado = await this.servicio.borrarProducto(id)
        res.json(productoEliminado)
    }
}

export default Controlador
