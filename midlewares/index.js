// const {validarCampos} = require('../midlewares/validar-campos');
// const {validarJWT} = require('../midlewares/validar-jwt');
// const {esAdminRole, tieneRole} = require('../midlewares/validar-roles');

const validarCampos = require('../midlewares/validar-campos');
const validarJWT = require('../midlewares/validar-jwt');
const validarRoles = require('../midlewares/validar-roles');
const validarArchivo = require('../midlewares/validar-archivo')


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
    // nota: con el spreat operativo pasamos todo lo que se este importando
}