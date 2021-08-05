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

        // cambio de estado de true a false

        const cheque = await Cliente.findByIdAndUpdate(id, {estado: false})

        res.json({cliente})
}

const chequesEditar = async(req, res = response) =>{
    const { id } = req.params
    const {fecha, monto, remitente} = req.body
    // cambio de precio, el stock cambia despues ( ABM clientes)
    const cambio = await Cliente.findOneAndUpdate(id, { fecha, monto, remitente})

    res.json({cambio})

}

const filtrarCheques = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query
    const {fecha,monto, remitente, estado} = req.body

    const [total , cheques] = await Promise.all([
        Cheque.countDocuments({fecha,monto, remitente, estado}),
        Cheque.find({fecha,monto, remitente, estado})
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


