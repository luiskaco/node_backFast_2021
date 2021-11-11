// const {validarCampos} = require('../midlewares/validar-campos');
// const {validarJWT} = require('../midlewares/validar-jwt');
// const {esAdminRole, tieneRole} = require('../midlewares/validar-roles');

const validarCampos = require('../midlewares/validar-campos');
const validarJWT = require('../midlewares/validar-jwt');
const validarRoles = require('../midlewares/validar-roles');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
    // nota: con el spreat operativo pasamos todo lo que se este importando
}