// importando mdulo de rutas de express
const {Router} = require('express');

// importando controllador
const {   usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioPath,
        usuarioDelete} 
    = require('../controllers/usuarioControllers')


// importamos la funcion router de express
const router = Router();

         // Ejmplo 
            // Definimos ls rutas
            // router.get('/',  (req, res) => {
            //     res.status(403).json({
            //         msg:"get Api"
            //     });
            // // res.send('Hello World')
            // })


        // Definimos ls rutas
        router.get('/', usuarioGet )

        router.post('/', usuarioPost)

        router.put('/:id', usuarioPut)

        router.patch('/', usuarioPath)

        router.delete('/', usuarioDelete)
   

// Exportamos las rutas
module.exports = router;