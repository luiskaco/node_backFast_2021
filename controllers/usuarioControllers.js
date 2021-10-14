
// importamos express para que nos ayude a encontrar la respuest http
const {response, request} = require('express'); // Importante


// importamos el modelo
const Usuario = require('../models/usuario')

// importamos bcrtype
const bcryptjs = require('bcryptjs')


const usuarioGet = (req = request, res = response) => {

   /* 
       nota: Automatica expreess te paresea los params si no se definen en las rutas

       example
       http://localhost:8080/api/usuarios?q=10&name=luisgomez&status=1
    */

    const {q, name= "no name", status, page= 1, limit= 10} = req.query

    res.status(403).json({
        msg:"Get Api - Controllador",
        q,
        name,
        status,
        page, 
        limit,
    });

}


const usuarioPost = async (req, res = response) => {

    // const errors = validationResult(req);

    // if(!errors.isEmpty() ){
    //     return res.status(400).json(errors)
    // }

   // const {nombre, edad} = req.body;

        //nota: desestructuramos lo que necesitamos
        const {nombre, correo, password, role} = req.body;
        //const {google , ...otros } = req.body;

        
    
    //Instanciamos

    // Primera forma de guardar
    //const usuario = new Usuario(otros);

    // Segunda forma de guardar
    const usuario = new Usuario({nombre, correo, password, role});

    // Verificar si el correo existe
        const existeEmail = await Usuario.findOne({correo});

            if( existeEmail ) 
            {
                return res.status(409).json({
                    msg: 'El correo ya esta registrado'
                });
            }

    // Encriptar contraseña
                
            // Generemoas el salt por default es 10
        const salt = bcryptjs.genSaltSync();

             // Encriptamos el passwordd
        usuario.password= bcryptjs.hashSync(password, salt);

    // Guardar
 


    await usuario.save();
  

    res.status(403).json({
       // msg:"Post Api - Controllador",
        usuario
    });
}

const usuarioPut = (req, res = response) => {
   


    const {id }= req.params;

    res.status(403).json({
        msg:"Put Api - Controllador",
        id
    });
}

const usuarioPath = (req, res = response) => {

    res.status(403).json({
        msg:"Path Api - Controllador"
    });
    
}

const usuarioDelete = (req, res = response) => {

    res.status(403).json({
        msg:"Delete Api - Controllador"
    });
    
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPath,
    usuarioDelete
}