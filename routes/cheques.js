const { Router } = require('express')

const { check } = require("express-validator")

const { validarCampos } = require('../middlewars/validar-campos')

const {esChequeMongo}= require('../helpers/db-validators')
    // esFechaCheque,
    // esMontoCheque,
    // esRemitenteCheque

const {
    crearCheque,
    chequesGet,
    chequesDelete,
    chequesEditar,
    filtrarCheques
} = require ("../controllers/cheques")


const router = Router()

///-------------------------- RUTAS DE CHEQUES --------------------------///

// - POST para crear un cheque, envio Fecha, monto, remitente

router.post('/cheques', [
    check('fecha', 'La fecha no es valida').notEmpty(),
    check('monto', 'El apellido no es valida').notEmpty(),
    check('remitente', 'El apellido no es valida').notEmpty(),
    validarCampos
], crearCheque)



// - GET para traer todos los cheques

router.get('/cheques', chequesGet)


// - PUT para editar un cheque


router.put('/cheques/editar/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esChequeMongo),
    //check('fecha', 'El formato no es una fecha').isDate(),
    check('fecha', 'Falta enviar fecha').notEmpty(),
    check('remitente', 'Falta enviar remitente').notEmpty(),
    validarCampos
], chequesEditar)



// - DEL para borrar un chque

router.delete('/cheques/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esChequeMongo),
    validarCampos

],chequesDelete)

// - GET con filtros.

router.get('/cheques/filtrar', filtrarCheques)




module.exports = router