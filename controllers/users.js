const {request , response} = require('express');
const Usuario = require('../models/usuario');
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

//CHRIS: COMENTE LAS DOS LINEAS DONDE SE ENCRIPTABA LA CONTRASENA.
const usuariosPost = async(req = request, res = response) => {

    const { nombre,apellido, telefono, correo, password} = req.body
    const usuario = new Usuario({nombre,apellido, telefono, correo, password})
    //encriptar la contrasena
    //const salt = bcryptjs.genSaltSync();
    //usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en DB
    await usuario.save()

    res.json({
        usuario
    })
}
/*
const usuariosLogin = async(req = request , res = response) => {

    let resultado = ''
    let resultado2 = ''
    const {correo, password} = req.body
    console.log(correo)

    const mail = Usuario.findOne({correo})
    console.log(pass.nombre)
    console.log(pass.toJSON())
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

}*/

//CHRIS: ACA HICE LA FUNCION DE LOGIN.
//SAQUE LA ENCRIPTACION.
const usuariosLogin = async(req = request , res = response) => {

    const {correo, password} = req.body

    
    //CHRIS: CAMBIE BASTANTE ESTO CON RESPESTO A SU FUNCION, LO ENCONTRE EN GOOGLE.
    Usuario.findOne({"correo":correo}).then(result => {
        if(result.password == password){
            console.log("Acesso permitido")
            res.json({
                result
            })
        }else{
            console.log("Accesso denegado")
            res.json({
                "Error" : "Usuario no encontrado"
            })
        }
    }).catch(err => console.error(`Algo salio mal`, err));
    

}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params

    //Borrado fisico

    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({usuario})
}



/*const passwordForgot = async(req, res = response) =>{
    const {_id, password,correo, ...resto} = req.body;
   
    const salt = bcryptjs.genSaltSync();
    const nuevoPass = bcryptjs.hashSync(password, salt)
   
    const filter = {correo}
    const update = {password : nuevoPass, nombre: 'Jode'}

    const cambio = await Usuario.findOneAndUpdate(filter, update)
    res.json(
        {cambio}
        )
}*/


//CHRIS: SACO EL ENCRIPTAR PASSWORD.
const passwordForgot = async(req, res = response) =>{
    const {_id, password,correo} = req.body;

    const query = { "correo": correo };
    const update = {password : password}

    await Usuario.findOneAndUpdate(query, update)
        .then(usuarioActualizado => {
            if(usuarioActualizado) {
                console.log(`Documento actualizado con exito: ${usuarioActualizado}.`)
            } else {
                console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(
                usuarioActualizado
                )
        })
        .catch(err => console.error(`Error al buscar y actualizar el documento: ${err}`))
}






module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosLogin,
    passwordForgot
}