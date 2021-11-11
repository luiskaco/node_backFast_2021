
// Importamos json
const { response , request} = require('express')

// importamos JWT
const jwt = require('jsonwebtoken')
const usuario = require('../models/usuario')

// importamos el modelo
const Usuario = require('../models/usuario')


const validarJWT = async (req = request, res = response, next) => {
    
    // Obtenemos el header
    const token = req.header('x-token')

    // Validamos que exista el token
    if(!token){
        return res.status(401).json({"msg":"No hay token en la peticion"});
    }

    try {
        // Verifica rel JSON WEB
        // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
         // console.log(payload)
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        // console.log(uid)

        // Consultamos la informaicon del usuario ID
        const usuario =  await Usuario.findById(uid);


           // Validar si existe el usuario se encuentre
            if(!usuario) {
                return res.status(401).json({
                    msg: 'Token No valido - Usuario no existe en DB'
                });
            }
            
            // Verificar si el uid no esta en estado false
            if(!usuario.estado){
                return res.status(401).json({
                    msg: 'Token No valido - Usuario con estado false'
                });
            }
        
        
        // Agregamos un parametros a la request
        req.usuario= usuario;
    

        next();
    } catch (error) {
        console.log(error)

        res.status(401).json({
            msg:'Token No valido'
        })
    }
  




}

module.exports = {
    validarJWT
}

// Nota: middleware para proteger rutas con jsons