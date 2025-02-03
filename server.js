import express from 'express'
import RouterProductos from './router/productos.js'
import config from './config.js'

class Server {

    start() {
        const app = express()

        app.use(express.static('public'))

        app.use(express.json())

        //--------- Rutas / endpoints API RESTful ------
        app.use('/api/productos', new RouterProductos().config())

        //------------ Listen del servidor Express ------------
        const PORT = config.PORT
        const server = app.listen(PORT, () => console.log(`Servidor ApiRESTful escuchando en http://localhost:${PORT}`))
        server.on('error', error => console.log(`Error en servidor: ${error.message}`))
    }
}

export default Server