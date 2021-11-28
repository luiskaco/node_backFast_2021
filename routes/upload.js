// importando mdulo de rutas de express
const {Router} = require('express');

    // importamos la funcion router de express
    const router = Router();

// Importamos valdiaciones
const { check } = require('express-validator');

 // importamos middleware personalizado
const {validarCampos, validarArchivoSubir} = require('../midlewares');

// Importando controlador
const { cargarArchivo, actualizarImagen, mostrarImagen , actualizarImagenClaudinary} = require('../controllers/uploadControllers');

// importando helpers
const {coleccionesPermitidas} = require('../helpers')


// {{url}/api/upload}


router.post('/',validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuario', 'producto']) ),


    // Mensaje
    validarCampos
], actualizarImagenClaudinary) // Ruta controlador claudinary 
// ], actualizarImagen) // Ruta controlador nativo

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuario', 'producto']) ),

      // Mensaje
      validarCampos

], mostrarImagen)


module.exports = router;