const { Router } = require('express')

const { check } = require("express-validator")


const { validarCampos } = require('../middlewars/validar-campos')
const {existeMail, esUsuarioMongo} = require('../helpers/db-validators')

const {
    usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosLogin
} = require ("../controllers/users")


const router = Router()

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioMongo),
    validarCampos
],usuariosPut )

router.post('/',[
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('password', 'El password no es valido').isLength({min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeMail),
    validarCampos
], usuariosPost)

router.post('/login', usuariosLogin)


router.delete('/:id',[

    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioMongo),
    validarCampos
],usuariosDelete)



router.patch('/', usuariosPatch)




module.exports = router