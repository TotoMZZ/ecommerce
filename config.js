import dotenv from 'dotenv'

dotenv.config()
//console.log(process.env)


const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'MEM'         // 'MEM' - 'FILE' - 'MONGODB'
const STRCNX = process.env.STRCNX || 'mongodb://localhost:27017'
const BASE = process.env.BASE || 'test'

export default {
    PORT,
    MODO_PERSISTENCIA,
    STRCNX,
    BASE
}