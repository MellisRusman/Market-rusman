const Usuario = require('../models/usuario')
const Producto = require('../models/producto')
const Proveedor = require('../models/proveedor')
const Cliente = require('../models/cliente')



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

const esProductoMongo = async(nombre)=>{
    const existeProd = await Producto.find({nombre})
    if (!existeProd){
        return new Error(`El id: ${id} no existe en la base de datos`)
    }
}

const esProveedorMongo = async(id) => {
    const existeProv = await Proveedor.findById(id)
    if (!existeProv){
        return new Error(`El id: ${id} no existe en la base de datos`)
    }
}

const esClienteMongo = async(id) =>{
    const existeCliente = await Cliente.findById(id)
    if (!existeCliente){
        return new Error(`El id: ${id} no existe en la base de datos`)
    }
}
module.exports = { existeMail, esUsuarioMongo, existeMailPass, esProductoMongo, esProveedorMongo, esClienteMongo}