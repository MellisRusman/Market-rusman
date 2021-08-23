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
    const {cantidad} = req.body
    // cambio de precio, el stock cambia despues ( ABM clientes)
    const cambio = await Cliente.findOneAndUpdate(id, { cantidad})

    res.json({cambio})

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


