const { validationResult } = require("express-validator")

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //console.log('Errores validarCampos', errors)
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validarCampos
}