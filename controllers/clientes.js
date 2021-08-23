const {request , response} = require('express');
const Cliente = require('../models/cliente');
const { validationResult } = require('express-validator');


const crearCliente = async(req = request, res = response) => {

    const {nombre,apellido, producto, cantidad, estado, estadoDeVenta} = req.body
    const cliente = new Cliente({nombre,apellido, producto, cantidad, estado, estadoDeVenta})


    //guardar en DB
    await cliente.save()

    res.json({
        cliente
    })
}

const clientesGet = async(req = request, res = response) => {

    const clientes = await Promise.all([
        Cliente.find({})
    ])
    res.json({
        clientes
    })

}

const clientesDelete = async(req = request, res = response) => {
    const {id} = req.params

    const query = { "_id": id };

    await Cliente.findOneAndDelete(query)
        .then(clienteBorrado => {
            if(clienteBorrado) {
            console.log(`Documento eliminado con éxito: ${clienteBorrado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(clienteBorrado)
        })
        .catch(err => console.error(`Error al buscar y eliminar el documento: ${err}`))

        
}

const clientesEditar = async(req, res = response) =>{
    const { id } = req.params
    const { nombre, apellido, producto, cantidad, estadoDeVenta} = req.body

    console.log(nombre, apellido, producto, cantidad, estadoDeVenta)
    const query = { "_id": id };



    await Cliente.findOneAndUpdate(query, {nombre:nombre, apellido: apellido , producto: producto , cantidad: cantidad , estadoDeVenta: estadoDeVenta })
        .then(clienteEditado => {
            if(clienteEditado) {
            console.log(`Documento actualizado con exito: ${clienteEditado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(clienteEditado)
        })
        .catch(err => console.error(`Error al buscar y actualizar el documento: ${err}`))

}


const filtrarClientes = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query
    const {nombre, apellido, producto, cantidad, estado, estadoDeVenta} = req.body

    const [total , clientes] = await Promise.all([
        Cliente.countDocuments({nombre, apellido, producto, cantidad, estado, estadoDeVenta}),
        Cliente.find({nombre, apellido, producto, cantidad, estado, estadoDeVenta})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        clientes
    })

}




module.exports = {
    crearCliente,
    clientesGet,
    clientesDelete,
    clientesEditar,
    filtrarClientes
}


