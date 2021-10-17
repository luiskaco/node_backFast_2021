
// importamos express para que nos ayude a encontrar la respuest http
const {response, request} = require('express'); // Importante


// importamos el modelo
const Usuario = require('../models/usuario')

// importamos bcrtype
const bcryptjs = require('bcryptjs')


const usuarioGet = async (req = request, res = response) => {

   /* 
       nota: Automatica expreess te paresea los params si no se definen en las rutas

       example
       http://localhost:8080/api/usuarios?q=10&name=luisgomez&status=1
    */

    // const {q, name= "no name", status, page= 1, limit= 10} = req.query

    const {limite=5, desde=0} = req.query;
    const quety = {estado:true}


    // BUSCANDO USUARIOS
    // const usuarios = await Usuario.find(quety)
        
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    //     const total = await Usuario.countDocuments(quety);

        // CRAMOS uN ARREGLO DE PROMESAS
        const [total, usuarios] = await Promise.all([   
            Usuario.countDocuments(quety), 
            Usuario.find(quety)
                .skip(Number(desde))
                .limit(Number(limite))

                /** 
                 *  Nota_ eñ  promise all ejecuta las promesas en simultaneos. Todas deben finalizar, si una falla todas daran error.
                 */
        ])

    res.status(403).json({
        msg:"Get Api - Controllador",
        total,
        usuarios
        
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

    // Verificar si el correo existe - FORMA REPETITIVA
        // const existeEmail = await Usuario.findOne({correo});
            
       
        //     if( existeEmail ) 
        //     {
        //         return res.status(409).json({
        //             msg: 'El correo ya esta registrado'
        //         });
        //     }


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

const usuarioPut = async (req, res = response) => {
   
    const {id }= req.params;
    const {_id, password, google, correo, ...otrosCampos} = req.body;

    // TODO validar contra BD


    if(password){
            // Generemoas el salt por default es 10
            const salt = bcryptjs.genSaltSync();

               // Encriptamos el passwordd
               otrosCampos.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, otrosCampos, {new:true})
    


    res.status(403).json({
        msg:"Put Api - Controllador",
        id,
        body:usuario
    });
}

const usuarioPath = (req, res = response) => {

    res.status(403).json({
        msg:"Path Api - Controllador"
    });
    
}

const usuarioDelete = async (req, res = response) => {

    const {id} = req.params;


    // Borrar ficsicamente
    // const usuario = await Usuario.findByIdAndDelete(id); 


    // Eliminando solo cambiando el usuario
        const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})


    res.status(403).json({
        msg:"Delete Api - Controllador",
        id,
        usuario
    });
    
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPath,
    usuarioDelete
}