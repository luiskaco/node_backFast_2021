// importando mdulo de rutas de express
const {Router, response} = require('express');

    // importamos la funcion router de express
    const router = Router();

// Importamos valdiaciones
const { check } = require('express-validator');

// Importanmos controlador
const { 
    crearCategoria , 
    obtenerCategoria, 
    obtenerCategoriaP, 
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/CategoriaControllers');

 // importamos middleware personalizado
const {validarJWT,  validarCampos, esAdminRole} = require('../midlewares');

// Importando validaciones personalizadas
const {isCategoria} = require('../helpers/db-validators');


/**
 *  {{url}}/api/categorias
 */

//  router.get('/', (req, res) => {
//     res.json("get");
//  })

// Obtener todas las categorias - Publico
router.get('/', obtenerCategoria)

// Obtener una categoria por ID - publico
router.get('/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    // check('id').custom(isCategoria),

    // Mensaje del check
   validarCampos
], obtenerCategoriaP )

 // Crear categoria - privado - Ciualquier persona con un token valido
 router.post('/', [
     validarJWT,
     check('nombre', 'El nombre no puede quedar vacio').not().isEmpty(),

     // Mensaje del check
     validarCampos
] , crearCategoria)
 
 // Actualizar un registro - privado - Ciualquier persona con un token valido
 router.put('/:id',
    [   
        validarJWT,
        check('nombre', 'El nombre no puede quedar vacio').not().isEmpty(),
        check('id', 'No es un id de mongo valido').isMongoId(),
        check('id').custom(isCategoria),

        // Mensaje del check
        validarCampos
    ], actualizarCategoria)

// Borrar una categoria - Admin
 router.delete('/:id', 
 [     
      validarJWT, 
      esAdminRole,
      check('id', 'No es un id de mongo valido').isMongoId(),
      validarCampos,

      check('id').custom(isCategoria),

      // Mensaje del check
      validarCampos
],
 eliminarCategoria)



module.exports = router;