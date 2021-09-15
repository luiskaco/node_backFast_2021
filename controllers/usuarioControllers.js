
// importamos express para que nos ayude a encontrar la respuest http

const {response, request} = require('express'); // Importante


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


const usuarioPost = (req, res = response) => {


    const {nombre, edad} = req.body;

    res.status(403).json({
        msg:"Post Api - Controllador",
        nombre, edad
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