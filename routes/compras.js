const { Router } = require('express')

const { check } = require("express-validator")

const { validarCampos } = require('../middlewars/validar-campos')

const {esCompraMongo}= require('../helpers/db-validators')
    // esFechaCheque,
    // esMontoCheque,
    // esRemitenteCheque

const {
    crearCompra,
    comprasGet,
    comprasEditar,
    comprasDelete,
    filtrarCompras
} = require ("../controllers/compras")


const router = Router()

///-------------------------- RUTAS DE COMPRAS --------------------------///

// - POST para crear una compra, envio id Proveedor, id Producto, cantidad, monto

router.post('/compras', [
    check('idProveedor', 'El idProveedor no es valido').notEmpty(),
    check('idProducto', 'El idProducto no es valido').notEmpty(),
    check('cantidad', 'La cantidad no es valida').notEmpty(),
    check('monto', 'El monto no es valido').notEmpty(),
    validarCampos
], crearCompra)



// - GET para traer todos las compras

router.get('/compras', comprasGet)


// - PUT para editar una compra


router.put('/compras/editar/:id',[
    check('idProveedor', 'El idProveedor no es valido').isMongoId(),
    check('idProducto', 'El idProducto no es valido').isMongoId(),
    check('id').custom(esCompraMongo),
    //check('fecha', 'El formato no es una fecha').isDate(),
    check('cantidad', 'La cantidad no es valida').notEmpty(),
    check('monto', 'El monto no es valido').notEmpty(),
    validarCampos
], comprasEditar)



// - DEL para borrar un compra

router.delete('/compras/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esCompraMongo),
    validarCampos

],comprasDelete)

// - GET con filtros.

router.get('/compras/filtrar', filtrarCompras)




module.exports = router