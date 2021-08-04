const { Router } = require('express')

const { check } = require("express-validator")


const { validarCampos } = require('../middlewars/validar-campos')
const {esProductoMongo} = require('../helpers/db-validators')

const {
    crearProducto,
    productosGet,
    productosDelete,
    productosEditar,
    filtrarProductos
} = require ("../controllers/productos.js")


const router = Router()


///-------------------------- RUTAS DE PRODUCTOS --------------------------///

// - POST para crear un producto, envio Nombre, descripcion, precio, stock.

router.post('/producto', [
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('descripcion', 'La descripcion no es valida').notEmpty(),
    check('precio', 'El precio no es valido').notEmpty(),
    check('stock', 'El stock no es valido').notEmpty(),
    validarCampos
], crearProducto)


// - GET para traer todos los productos

router.get('/producto', productosGet)


// - DELETE para borrar un producto


router.delete('/producto/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esProductoMongo),
    validarCampos

],productosDelete)

// - PUT para editar un producto

router.put('/producto/editar/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esProductoMongo),
    check('newPrice').isEmpty(),
    validarCampos
], productosEditar)


// - GET para filtrar productos

router.get('/producto/filtrar', filtrarProductos)


module.exports = router