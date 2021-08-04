const { Router } = require('express')

const { check } = require("express-validator")

const { validarCampos } = require('../middlewars/validar-campos')

const {esProveedorMongo} = require('../helpers/db-validators')

const {
    crearProveedor,
    proveedorGet,
    proveedorEditar,
    proveedorDelete
} = require ("../controllers/proveedores")


const router = Router()

///-------------------------- RUTAS DE PROVEEDORES --------------------------///

// - POST para crear un proveedor, envio Nombre, apellido, razon social

router.post('/proveedor', [
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('apellido', 'El apellido no es valida').notEmpty(),
    check('razonSocial', 'La razon social no es valida').notEmpty(),
    validarCampos
], crearProveedor)



// - GET para traer todos los proveedores

router.get('/proveedor', proveedorGet)


// - PUT para editar un proveedor


router.put('/proveedor/editar/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esProveedorMongo),
    //check('razonSocial').notEmpty(),
    validarCampos
], proveedorEditar)



// - DEL para borrar un provedor

router.delete('/proveedor/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esProveedorMongo),
    validarCampos

],proveedorDelete)

// - GET con filtros.


































































module.exports = router