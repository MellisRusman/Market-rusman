const {request , response} = require('express');
const Proveedor = require('../models/proveedor');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');

const crearProveedor = async(req = request, res = response) => {

    const {nombre, apellido, razonSocial} = req.body
    const proveedor = new Proveedor({nombre, apellido, razonSocial})


    //guardar en DB
    await proveedor.save()

    res.json({
        proveedor
    })
}


const proveedorGet = async(req = request, res = response) => {

    const proveedores = await Promise.all([
        Proveedor.find({})
    ])
    res.json({
        proveedores
    })

}


const proveedorEditar = async(req, res = response) =>{
    const { id } = req.params
    const { nombre , apellido, razonSocial} = req.body
    // cambio de nombre o appelido del provedor o razon social
    const cambio = await Proveedor.findOneAndUpdate(id, { nombre , apellido, razonSocial})

    res.json({cambio})

}






module.exports = {
    crearProveedor,
    proveedorGet,
    proveedorEditar
}