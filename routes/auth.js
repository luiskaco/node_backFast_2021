// importando mdulo de rutas de express
const {Router} = require('express');

    // importamos la funcion router de express
    const router = Router();

// Importamos valdiaciones
const { check } = require('express-validator');

 // importamos middleware personalizado
const {validarCampos} = require('../midlewares/validar-campos');

// importamos controlador
const {login} = require('../controllers/authControllers');


// Definimos ls rutas
router.post('/login',[
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La contrasela es obligatoria').not().isEmpty(),

    // Midlearare
    validarCampos
], login )


module.exports = router;