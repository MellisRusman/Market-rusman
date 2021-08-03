const { Router } = require('express')

const { check } = require("express-validator")


const { validarCampos } = require('../middlewars/validar-campos')
const {existeMail, esUsuarioMongo, existeMailPass} = require('../helpers/db-validators')

const {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPatch,
    usuariosLogin,
    passwordForgot
} = require ("../controllers/users")


const router = Router()

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




module.exports = router