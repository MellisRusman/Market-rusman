const {request , response} = require('express');
const Cheque = require('../models/cheque');
const { validationResult } = require('express-validator');


const crearCheque = async(req = request, res = response) => {

    const {fecha,monto, remitente, estado} = req.body
    const cheque = new Cheque({fecha,monto, remitente, estado})


    //guardar en DB
    await cheque.save()

    res.json({
        cheque
    })
}

const chequesGet = async(req = request, res = response) => {

    const cheques = await Promise.all([
        Cheque.find({})
    ])
    res.json({
        cheques
    })

}

const chequesDelete = async(req = request, res = response) => {
    const {id} = req.params

    const query = { "_id": id };

    await Cheque.findOneAndDelete(query)
        .then(chequeBorrado => {
            if(chequeBorrado) {
            console.log(`Documento eliminado con éxito: ${chequeBorrado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(chequeBorrado)
        })
        .catch(err => console.error(`Error al buscar y eliminar el documento: ${err}`))

}

const chequesEditar = async(req, res = response) =>{
    const { id } = req.params
    const { fecha, monto, remitente} = req.body

    console.log( fecha, monto, remitente)
    const query = { "_id": id };



    await Cheque.findOneAndUpdate(query, {fecha: fecha, monto: monto, remitente: remitente})
        .then(chequeEditado => {
            if(chequeEditado) {
            console.log(`Documento actualizado con exito: ${chequeEditado}.`)
            } else {
            console.log("Ningún documento coincide con la consulta proporcionada.")
            }
            res.json(chequeEditado)
        })
        .catch(err => console.error(`Error al buscar y actualizar el documento: ${err}`))

}

const filtrarCheques = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query
    const {fecha, monto, remitente, estado} = req.body

    const [total , cheques] = await Promise.all([
        Cheque.countDocuments({fecha, monto, remitente, estado}),
        Cheque.find({fecha, monto, remitente, estado})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        cheques
    })

}




module.exports = {
    crearCheque,
    chequesGet,
    chequesDelete,
    chequesEditar,
    filtrarCheques
}


