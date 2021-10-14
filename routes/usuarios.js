// importando mdulo de rutas de express
const {Router} = require('express');

// Importamos valdiaciones
const {check} = require('express-validator')

// importamos middleware personalizado
const {validarCampos} = require('../midlewares/validar-campos');

// importando controllador
const { usuarioGet,
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

        router.post('/',[
            // Armamos los middleware que se encargan de chekear los errores
     
            check('nombre', 'El nombre no puede quedar vacio').not().isEmpty(),
            check('password', 'El password debe de contener mas de seis(6) letras').isLength({min:6}),
            check('password', 'El password es obligatorio').not().isEmpty(),
            check('correo', 'El correo no es valido').isEmail(),
            check('role', 'No puede quedar vacio').not().isEmpty(),
            check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
            
            // Middlware personalizado
            validarCampos,

        ], usuarioPost)

        router.put('/:id', usuarioPut)

        router.patch('/', usuarioPath)

        router.delete('/', usuarioDelete)
   

// Exportamos las rutas
module.exports = router;