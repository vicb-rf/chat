const { Router } = require('express');
const { check } = require('express-validator');

const login = require('../controllers/auth.controller');
const { buscarUsuario } = require('../helpers/validaciones');
const { validarCampos } = require('../middleware/validarcampos');

const router = Router();

router.post('/auth/login', 
[
    //check('password', 'Error en el password').not().isEmpty(),
    check('email', 'Error en el correo').isEmail(),
    check('email').custom(buscarUsuario),
    check('password', 'Password es necesario').not().isEmpty(),
    validarCampos
]
, login);

module.exports = router