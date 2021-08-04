const {request , response} = require('express');
const Producto = require('../models/producto');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');


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

        // cambio de estado de true a false

        const usuario = await Producto.findByIdAndUpdate(id, {estado: false})

        res.json({usuario})
    }

const productosEditar = async(req, res = response) =>{
    const { id } = req.params
    const { precio} = req.body
    // cambio de precio, el stock cambia despues (ABM compras, ABM clientes)
    const cambio = await Producto.findOneAndUpdate(id, {precio})

    res.json({cambio})

}

const filtrarProductos = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query
    const {precio, stock, nombre, descripcion} = req.body

    const [total , productos] = await Promise.all([
        Producto.countDocuments({precio, stock, nombre, descripcion}),
        Producto.find({precio, stock, nombre, descripcion})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        productos
    })

}




module.exports = {
    crearProducto,
    productosGet,
    productosDelete,
    productosEditar,
    filtrarProductos
}


