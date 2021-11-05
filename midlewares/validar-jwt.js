
// Importamos json
const { response } = require('express')
const jwt = require('jsonwebtoken')


const validarJWT = (req = request, res = response, next) => {
    
    // Obtenemos el header
    const token = req.header('x-token')

    // Validamos que exista el token
    if(!token){
        return res.status(401).json({"msg":"No hay token en la peticion"});
    }

    try {
        // Verifica rel JSON WEB
        // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        // console.log(uid)
        // console.log(payload)

        // Agregamos un parametros a la request
        req.uid = uid;


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