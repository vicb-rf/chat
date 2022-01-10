const { Router } = require('express');
const { check } = require('express-validator');

const { usuarioGet, usuarioPost, usuarioDelete } = require('../controllers/usuario.controller');
const { emailExiste, usuarioExisteId } = require('../helpers/validaciones');
const { validarCampos } = require('../middleware/validarcampos');
const validarJWT = require('../middleware/validarjwt');
const router = Router();

router.get('/users', 
[
    validarJWT,
    validarCampos
], 
usuarioGet);

router.post('/register', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Email no valido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'Password es necesario').not().isEmpty(),
    validarCampos
], 
usuarioPost);

router.delete('/:id', 
[
    validarJWT,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(usuarioExisteId),
    validarCampos
], 
usuarioDelete);

module.exports = router