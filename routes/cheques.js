const { Router } = require('express')

const { check } = require("express-validator")

const { validarCampos } = require('../middlewars/validar-campos')

const {
    esChequeMongo,
    esFechaCheque,
    esMontoCheque,
    esRemitenteCheque} = require('../helpers/db-validators')

const {
    crearCheque,
    chequesGet,
    chequesDelete,
    chequesEditar,
    filtrarCheques
} = require ("../controllers/cheques")


const router = Router()

///-------------------------- RUTAS DE CHEQUES --------------------------///

// - POST para crear un cliente, envio Nombre, apellido, producto, cantidad y estado

router.post('/cheques', [
    check('fecha', 'La fecha no es valida').notEmpty(),
    check('monto', 'El apellido no es valida').notEmpty(),
    check('remitente', 'El apellido no es valida').notEmpty(),
    validarCampos
], crearCheque)



// - GET para traer todos los clientes

router.get('/cheques', chequesGet)


// - PUT para editar un cliente


router.put('/cheques/editar/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esChequeMongo),
    check('fecha').custom(esFechaCheque),
    check('monto').custom(esMontoCheque),
    check('remitente').custom(esRemitenteCheque),
    validarCampos
], chequesEditar)



// - DEL para borrar un provedor

router.delete('/cheques/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esChequeMongo),
    validarCampos

],chequesDelete)

// - GET con filtros.

router.get('/cheques/filtrar', filtrarCheques)




module.exports = router