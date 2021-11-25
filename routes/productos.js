// importando mdulo de rutas de express
const {Router} = require('express');

    // importamos la funcion router de express
    const router = Router();

// Importamos valdiaciones
const { check } = require('express-validator');

 // importamos middleware personalizado
 const {validarJWT,  validarCampos, esAdminRole} = require('../midlewares');

// Importanmos controlador
const { 
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/ProductosController.s');


// Importando validaciones personalizadas
const {isProducto, isCategoria} = require('../helpers/db-validators');

/**
 *  {{url}}/api/productos
 */

router.get('/', obtenerProductos)

router.get('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(isProducto),

    // Mensaje del check
    validarCampos
], obtenerProducto)

 router.post('/',[
    validarJWT,
    check('nombre', 'El nombre no puede quedar vacio').not().isEmpty(),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(isCategoria),

    // Mensaje del check
    validarCampos], 
crearProducto)

 router.put('/:id', 
       [ validarJWT,
        // check('categoria', 'No es un id de mongo valido').isMongoId(),
        // check('categoria').custom(isCategoria),

        check('id', 'No es un id de mongo valido').isMongoId(),
        check('id').custom(isProducto),

        // Mensaje del check
        validarCampos],
    actualizarProducto
 )

 router.delete('/:id', 
        [     
            validarJWT, 
            esAdminRole,
            check('id', 'No es un id de mongo valido').isMongoId(),
            validarCampos,

            check('id').custom(isProducto),

            // Mensaje del check
            validarCampos
        ], eliminarProducto)



 module.exports = router;


