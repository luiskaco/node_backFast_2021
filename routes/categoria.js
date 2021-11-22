// importando mdulo de rutas de express
const {Router, response} = require('express');

    // importamos la funcion router de express
    const router = Router();

// Importamos valdiaciones
const { check } = require('express-validator');

// Importanmos controlador
const { crearCategoria } = require('../controllers/CategoriaControllers');

 // importamos middleware personalizado
const {validarJWT,  validarCampos} = require('../midlewares');


/**
 *  {{url}}/api/categorias
 */

//  router.get('/', (req, res) => {
//     res.json("get");
//  })

// Obtener todas las categorias - Publico
router.get('/', (req, res) => {
   res.json("get");
})

// Obtener una categoria por ID - publico
router.get('/:id', (req, res) => {
    res.json("get - id");
 })

 // Crear categoria - privado - Ciualquier persona con un token valido
 router.post('/', [
     validarJWT,
     check('nombre', 'El nombre no puede quedar vacio').not().isEmpty(),
     validarCampos
] , crearCategoria)
 
 // Actualizar un registro - privado - Ciualquier persona con un token valido
 router.put('/:id', (req, res) => {
    res.json("put");
 })

// Borrar una categoria - Admin
 router.delete('/:id', (req, res) => {
    res.json("delete");
 })



module.exports = router;