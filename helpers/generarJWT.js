// Importamos JWT
const jwt = require('jsonwebtoken')

// nota: kson webtoken actualmente trabja en callback por ello se debe generar una promesa manualemnte

const generarJWT = ( uid = '') => {  // uid = identificador unico de usuario
    
    return new Promise( (resolve, reject) => {

        // Generar el JSONWEB
        const payload = {uid};
        
        // Firmamos el token
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{ expiresIn: parseInt(process.env.TTL) }, //'4h'  parseInt(process.env.TTL)
                // Definimos el callback
         (err, token) => {

            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
              //  console.log(token);
                resolve(token)

            }    
          });

       
      
    });
}

module.exports = {
    generarJWT
}