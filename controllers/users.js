const {request , response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');


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

const usuariosPost = async(req, res = response) => {

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
    const usuariosLogin = async(req, res = response) => {

        let resultado = false
        const { nombre,apellido, telefono, correo, password} = req.body


    const usuario = await Promise.all([
        Usuario.find({correo})
    ])
    if (password){
        const salt = bcryptjs.genSaltSync();
        contra = bcryptjs.hashSync(password, salt)
    }
    try {
        if (usuario.password === contra){
            resultado = 'OK'
    }} catch (error) {
            throw error
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


module.exports = {
    usuariosGet,
    usuariosDelete,
    //usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosLogin
}