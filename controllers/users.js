const {request , response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const { rawListeners } = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    const usuarios = await Promise.all([
        Usuario.find({})
    ])
    res.json({
        usuarios
    })

}

const usuariosPut = async(req , res = response) => {
    const {id} = req.params;
    const {_id, password,correo, ...resto} = req.body;
    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }


    const usuario = await Usuario.findByIdAndUpdate(id , resto)
    res.json(usuario)
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password} = req.body
    const usuario = new Usuario({nombre, correo, password})
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
        const { correo, password} = req.body


    const usuario = await Promise.all([
        Usuario.find({correo})
    ])
    if (password){
        const salt = bcryptjs.genSaltSync();
        dos = bcryptjs.hashSync(password, salt)
    }
    if (usuario.password == dos){
        resultado = true
    }
    res.json({
        dos,
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
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosLogin
}