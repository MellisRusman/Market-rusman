const {request , response} = require('express');
const Proveedor = require('../models/proveedor');
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
    const { nombre, apellido, razonSocial} = req.body

    console.log(nombre, apellido, razonSocial)
    const query = { "_id": id };



    await Proveedor.findOneAndUpdate(query, {nombre: nombre, apellido: apellido, razonSocial: razonSocial})
        .then(proveedorEditado => {
            if(proveedorEditado) {
            console.log(`Documento actualizado con exito: ${proveedorEditado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(proveedorEditado)
        })
        .catch(err => console.error(`Error al buscar y actualizar el documento: ${err}`))

}




const proveedorDelete = async(req = request, res = response) => {

    const {id} = req.params

    const query = { "_id": id };

    await Proveedor.findOneAndDelete(query)
        .then(proveedorBorrado => {
            if(proveedorBorrado) {
            console.log(`Documento eliminado con éxito: ${proveedorBorrado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(proveedorBorrado)
        })
        .catch(err => console.error(`Error al buscar y eliminar el documento: ${err}`))


    }



const filtrarProveedor = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query
    const {nombre, apellido, razonSocial, estado} = req.body

    const [total , proveedores] = await Promise.all([
        Proveedor.countDocuments({nombre, apellido, razonSocial}),
        Proveedor.find({nombre, apellido, razonSocial})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        proveedores
    })

}



module.exports = {
    crearProveedor,
    proveedorGet,
    proveedorEditar,
    proveedorDelete,
    filtrarProveedor
}