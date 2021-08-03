const Usuario = require('../models/usuario')
const Producto = require('../models/producto')



const existeMail = async(correo = '')=>{
    const existEmail = await Usuario.findOne({correo})
    if (existEmail){
        throw new Error(`El correo ${correo} ya existe en nuestra DB, por favor ingrese uno nuevo`)
}
}
const existeMailPass = async(correo = '')=>{
    const existEmail = await Usuario.findOne({correo})
    if (existEmail){
        throw new Error(`El correo ${correo} ya existe en nuestra DB, por favor ingrese uno nuevo`)
    }else{
        throw new Error(`El correo ${correo} no existe en nuestra DB`)
    }
}

const esUsuarioMongo = async(id)=>{
    const existeUser = await Usuario.findById(id)
    if (!existeUser){
        return new Error(`El id: ${id} no existe en la base de datos`)
    }
}

const esProductoMongo = async(id)=>{
    const existeProd = await Producto.findById(id)
    if (!existeProd){
        return new Error(`El id: ${id} no existe en la base de datos`)
    }
}

module.exports = { existeMail, esUsuarioMongo, existeMailPass, esProductoMongo}