const {request , response} = require('express');
const Compra = require('../models/compra');
const { validationResult } = require('express-validator');

const crearCompra = async(req = request, res = response) => {

    const {idProveedor, idProducto, cantidad, monto, estado} = req.body
    const compra = new Compra({idProveedor, idProducto, cantidad, monto, estado})


    //guardar en DB
    await compra.save()

    res.json({
        compra
    })
}


const comprasGet = async(req = request, res = response) => {

    const compras = await Promise.all([
        Compra.find({})
    ])
    res.json({
        compras
    })

}


const comprasEditar = async(req, res = response) =>{
    const { id } = req.params
    const {idProveedor, idProducto, cantidad, monto, estado } = req.body
    // cambio de idProveedor, idProducto, cantidad, monto
    const cambio = await Compra.findOneAndUpdate(id, {idProveedor, idProducto, cantidad, monto, estado})

    res.json({cambio})

}



const comprasDelete = async(req = request, res = response) => {
    const {id} = req.params

    // cambio de estado de true a false

    const compra = await Compra.findByIdAndUpdate(id, {estado: false})

    res.json({compra})
}



const filtrarCompras = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query
    const {idProveedor, idProducto, cantidad, monto, estado} = req.body

    const [total , compras] = await Promise.all([
        Compra.countDocuments({idProveedor, idProducto, cantidad, monto, estado}),
        Compra.find({idProveedor, idProducto, cantidad, monto, estado})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        compras
    })

}



module.exports = {
    crearCompra,
    comprasGet,
    comprasEditar,
    comprasDelete,
    filtrarCompras
}