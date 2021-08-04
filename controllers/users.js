const {request , response} = require('express');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');





//------------------------ FUNCIONES DE USUARIOS ------------------------//


const usuariosGet = async(req = request, res = response) => {

    const usuarios = await Promise.all([
        Usuario.find({})
    ])
    res.json({
        usuarios
    })

}

// const usuariosPut = async(req , res = response) => {
//     let resultado = false
//     const {id} = req.params;
//     const usuarios = await Promise.all([
//         Usuario.find({})
//     ])
//     if (usuario){
//         msg:"El usuario es correcto"
//     }
//     const {_id, password,correo, ...resto} = req.body;
//     if (password){
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync(password, salt)
//     }
//     if (Usuario.correo === correo ){
//         let resultado = true
//     }
//     const usuario = await Usuario.findByIdAndUpdate(id , resto)
//     res.json(usuario, resultado )
// }

const usuariosPost = async(req = request, res = response) => {

    const { nombre,apellido, telefono, correo, password} = req.body
    const usuario = new Usuario({nombre,apellido, telefono, correo, password})
    //verificar si el correo existe


    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en DB
    await usuario.save()

    res.json({
        usuario
    })
    }

const usuariosLogin = async(req = request , res = response) => {

    let resultado = 'Error'
    const {correo, password} = req.body


    const usuario = Usuario.findOne({correo}, {password})


    if (usuario){
        if(password){
            const salt = bcryptjs.genSaltSync();
            contra = bcryptjs.hashSync(password, salt)
        }else{
            resultado = await new Error(`Error`)
        }
        resultado = 'OK'
    }

    res.json({
        contra,
        resultado
    })

}



const usuariosDelete = async(req, res = response) => {

    const {id} = req.params

    //Borrado fisico

    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({usuario})
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: 'pacho',
        msg : 'patch - controller'
    })
    }



const passwordForgot = async(req, res = response) =>{
    const {correo, password} = req.body

    if (password){
        const salt = bcryptjs.genSaltSync();
        contra = bcryptjs.hashSync(password, salt)
    }

    const cambio = await Usuario.findOneAndUpdate(correo, {password: contra})

    res.json({cambio})

}



//------------------------ FUNCIONES DE PRODUCTOS ------------------------//


const crearProducto = async(req = request, res = response) => {

    const {nombre,descripcion, precio, stock} = req.body
    const producto = new Producto({nombre,descripcion, precio, stock})


    //guardar en DB
    await producto.save()

    res.json({
        producto
    })
    }

const productosGet = async(req = request, res = response) => {

    const productos = await Promise.all([
        Producto.find({})
    ])
    res.json({
        productos
    })

}

const productosDelete = async(req = request, res = response) => {
        const {id} = req.params

        //Borrado fisico

        const usuario = await Producto.findByIdAndUpdate(id, {estado: false})

        res.json({usuario})
    }























module.exports = {
    usuariosGet,
    usuariosDelete,
    //usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosLogin,
    passwordForgot,
    crearProducto,
    productosGet,
    productosDelete
}
