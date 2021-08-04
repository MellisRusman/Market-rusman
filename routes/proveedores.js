const { Router } = require('express')

const { check } = require("express-validator")

const { validarCampos } = require('../middlewars/validar-campos')

const {
    crearProveedor
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






































































module.exports = router