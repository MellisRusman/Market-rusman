const {request , response} = require('express');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const { Schema } = require('mongoose');
const { findOneAndReplace } = require('../models/usuario');





//------------------------ FUNCIONES DE USUARIOS ------------------------//


const usuariosGet = async(req = request, res = response) => {

    const usuarios = await Promise.all([
        Usuario.find({})
    ])
    res.json({
        usuarios
    })

}

const usuariosPost = async(req = request, res = response) => {

    const { nombre,apellido, telefono, correo, password} = req.body
    const usuario = new Usuario({nombre,apellido, telefono, correo, password})
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

    let resultado = ''
    let resultado2 = ''
    const {correo, password} = req.body
    const salt = bcryptjs.genSaltSync();
    contra = bcryptjs.hashSync(password, salt)

    const pass = Usuario.findOne({contra})
    const mail = Usuario.findOne({correo})
    try {
        if (contra === pass){
            resultado = 'Ok pass'
        }
        if (mail === correo){
            resultado2 = 'Ok correo'
        }
        // else{
        //     resultado = 'Error pass'
        // }
    } catch (error) {
        throw new Error(`${error}`)
    }

    res.json({
        resultado,
        resultado2
    })

}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params

    //Borrado fisico

    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({usuario})
}


//no funciona
const passwordForgot = async(req, res = response) =>{
    const {_id, password,correo, ...resto} = req.body;
    const usuario = Usuario.findOne({correo})
    if (password){
        const salt = bcryptjs.genSaltSync();
        usuario.resto.password = bcryptjs.hashSync(password, salt)
    }

    const cambio = await findOneAndReplace({password})
    res.json(
        {cambio}
        )
}






module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosLogin,
    passwordForgot
}