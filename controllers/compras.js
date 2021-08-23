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
    const { idProveedor, idProducto, cantidad, monto} = req.body

    console.log(idProveedor, idProducto, cantidad, monto)
    const query = { "_id": id };



    await Compra.findOneAndUpdate(query, {idProveedor: idProveedor, idProducto: idProducto, cantidad: cantidad, monto: monto})
        .then(compraEditado => {
            if(compraEditado) {
            console.log(`Documento actualizado con exito: ${compraEditado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(compraEditado)
        })
        .catch(err => console.error(`Error al buscar y actualizar el documento: ${err}`))

}



const comprasDelete = async(req = request, res = response) => {
    const {id} = req.params

    const query = { "_id": id };

    await Compra.findOneAndDelete(query)
        .then(compraBorrado => {
            if(compraBorrado) {
            console.log(`Documento eliminado con éxito: ${compraBorrado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(compraBorrado)
        })
        .catch(err => console.error(`Error al buscar y eliminar el documento: ${err}`))

        
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