const {Router} = require('express');


const router = Router()

// importar buscar
const { buscar ,buscarProductoCategoria} = require('../controllers/BuscarControllers');

// Buscar Categoria
router.get('/searchCate/:termino', buscarProductoCategoria);

// Buscar terminos
 router.get('/:coleccion/:termino', buscar);


/**
 * Nota: el orden de las rutas afecta. Estilo laravel recuerda
 */

module.exports = router;