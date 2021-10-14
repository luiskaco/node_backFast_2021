
// importamos validation result de expres validato
const {validationResult} = require('express-validator')


const validarCampos = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty() ){
        return res.status(400).json(errors)
    }

    // Enviamos al siguiente procesos midlres, controlador etc
    next();

}

module.exports = {
    validarCampos
}