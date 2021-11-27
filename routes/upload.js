// importando mdulo de rutas de express
const {Router} = require('express');

    // importamos la funcion router de express
    const router = Router();

// Importamos valdiaciones
const { check } = require('express-validator');

 // importamos middleware personalizado
const {validarCampos} = require('../midlewares/validar-campos');

// Importando controlador
const { cargarArchivo } = require('../controllers/uploadControllers');


// {{url}/api/upload}


router.post('/',cargarArchivo)



module.exports = router;