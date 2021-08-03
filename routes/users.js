const { Router } = require('express')

const { check } = require("express-validator")


const { validarCampos } = require('../middlewars/validar-campos')
const {existeMail, esUsuarioMongo, existeMailPass, esProductoMongo} = require('../helpers/db-validators')

const {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPatch,
    usuariosLogin,
    passwordForgot,
    crearProducto,
    productosGet,
    productosDelete
} = require ("../controllers/users")


const router = Router()



///-------------------------- RUTAS DE USUARIOS --------------------------///



router.get('/', usuariosGet)


router.post('/',[
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('password', 'El password no es valido').isLength({min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeMail),
    validarCampos
], usuariosPost)

router.post('/login',[
    check('password', 'El password no es valido').isLength({min: 6 }),
    check('password', 'El password tiene que ser enviado').notEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo tiene que ser enviado').notEmpty(),
    validarCampos
], usuariosLogin)


router.delete('/:id',[

    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioMongo),
    validarCampos
],usuariosDelete)

router.put('/login-forgot',[
    check('password', 'El password no es valido').isLength({min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeMailPass),
    validarCampos
], passwordForgot)

router.patch('/', usuariosPatch)






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
    check('id', 'El id no fue enviado').notEmpty(),
    check('id').custom(esProductoMongo),
    validarCampos

],productosDelete)




///-------------------------- RUTAS DE PROVEEDORES --------------------------///



///-------------------------- RUTAS DE CLIENTES --------------------------///



///-------------------------- RUTAS DE CHEQUES --------------------------///



///-------------------------- RUTAS DE COMPRAS --------------------------///



///-------------------------- RUTAS DE VENTAS --------------------------///





module.exports = router