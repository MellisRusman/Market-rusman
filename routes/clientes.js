const { Router } = require('express')

const { check } = require("express-validator")

const { validarCampos } = require('../middlewars/validar-campos')

const {esClienteMongo, esProductoMongo} = require('../helpers/db-validators')

const {
    crearCliente,
    clientesGet,
    clientesDelete,
    clientesEditar,
    filtrarClientes
} = require ("../controllers/clientes")


const router = Router()

///-------------------------- RUTAS DE CLIENTES --------------------------///

// - POST para crear un cliente, envio Nombre, apellido, producto, cantidad y estado

router.post('/clientes', [
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('apellido', 'El apellido no es valida').notEmpty(),
    validarCampos
], crearCliente)



// - GET para traer todos los clientes

router.get('/clientes', clientesGet)


// - PUT para editar un cliente


router.put('/clientes/editar/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esClienteMongo),
    check('producto').custom(esProductoMongo),
    validarCampos
], clientesEditar)



// - DEL para borrar un provedor

router.delete('/clientes/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esClienteMongo),
    validarCampos

],clientesDelete)

// - GET con filtros.

router.get('/clientes/filtrar', filtrarClientes)




module.exports = router