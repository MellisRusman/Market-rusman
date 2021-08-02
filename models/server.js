
const express = require('express')
const cors = require('cors')
const { dbConection } = require("../db/config")

class Servidor{
    constructor(){

        //Iniciamos express
        this.app = express()

        //Puerto
        this.port = process.env.PORT

        // Llamar a la base de datos
        this.conectarDB()

        //MiddleWares
        this.middlewares()

        this.usuarioPath = '/api/usuarios'
        

        //Rutas del archivo
        this.rutas()
    }

    async conectarDB(){
        await dbConection()
    }



    middlewares(){
        //Directorio publico (public)
        this.app.use(cors())
        this.app.use(express.static('public'))
        this.app.use(express.json())
    }

    rutas(){
        this.app.use(this.usuarioPath, require('../routes/users'))
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log("El servidor esta corriendo en el puerto", this.port)
        })
    }
}



module.exports = Servidor;