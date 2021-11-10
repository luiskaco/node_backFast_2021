// importando mdulo de rutas de express
const {Router} = require('express');

// Importamos valdiaciones
const {check} = require('express-validator')

// importamos middleware personalizado
const {validarCampos} = require('../midlewares/validar-campos');
const {validarJWT} = require('../midlewares/validar-jwt');
const {esAdminRole, tieneRole} = require('../midlewares/validar-roles');

    /**
     * Nota: Los middleware funciona en cascada si uno falla detiene el proceso de los demas
     **/

    // Importando validaciones personalizadas
    const {esRolvalido, emailExiste, existeUsuarioporID} = require('../helpers/db-validators');


// importando controllador
const { usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioPath,
        usuarioDelete} 
    = require('../controllers/usuarioControllers');

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
            check('correo').custom((correo) => emailExiste(correo)),
            check('role', 'No puede quedar vacio').not().isEmpty(),

            // VALIDACION SIN BASE DE DATOS

               // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),

            // VALIDACION CON BASE DE DATOS

                // check('role').custom(async (rol ='') => {
                    
                //     // Buscamso el rol
                //     const existeRol = await Role.findOne({"role":rol});

                //     // Si no existe enviamos error
                //     if(!existeRol){
                //         throw new Error(`El rol ${rol} no esta registrado en la BD`);
                //     }
                // }),

                check('role').custom(esRolvalido),
            
            // Middlware personalizado
            validarCampos,

        ], usuarioPost)

        router.put('/:id', 
                check('id', 'No es un ID Valido').isMongoId(),
                check('id').custom(existeUsuarioporID),
                
                check('role').custom(esRolvalido),
                // Middlware personalizado
                validarCampos,
        usuarioPut)

        router.patch('/', usuarioPath)

        router.delete('/:id',[
            validarJWT,
            // esAdminRole,  
            tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
            check('id', 'No es un ID Valido').isMongoId(),
            check('id').custom(existeUsuarioporID),
            validarCampos
        ], usuarioDelete)
   

// Exportamos las rutas
module.exports = router;