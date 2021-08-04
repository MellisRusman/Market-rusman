const {request , response} = require('express');
const Producto = require('../models/producto');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');

const crearProveedor = async(req = request, res = response) => {

    const {nombre, apellido, razonSocial} = req.body
    const proveedor = new Producto({nombre, apellido, razonSocial})


    //guardar en DB
    await proveedor.save()

    res.json({
        proveedor
    })
}


module.exports = {
    crearProveedor
}