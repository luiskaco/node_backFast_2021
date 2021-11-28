
// Importamos los helper
const dbValidators = require('./db-validators');
const generaJWT = require('./generarJWT');
const googleVerify = require('./google-verif');
const subirArchivo = require('./subir-archivo');




module.exports  = {
    ...dbValidators, // Exparcimos todo su contenido con el sprea
    ...generaJWT,
    ...googleVerify,
    ...subirArchivo
}