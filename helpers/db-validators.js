
// Importando el modelo rol
const Role = require('../models/role');

// Importando el modelo usuario
const {Usuario} = require('../models');


// Validando email
const esRolvalido = async (rol ='') => {
                
    // Buscamso el rol
    const existeRol = await Role.findOne({"role":rol});

    // Si no existe enviamos error
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

// Validando correo
const emailExiste =  async (correo = "") => {
    const existeEmail = await Usuario.findOne({correo});
            
    if( existeEmail ) 
    {
        throw new Error(`Este correo ${correo}, ya esta registrado`);
    }
}

// Validando usuario por id
const existeUsuarioporID =  async (id) => {

    const existeUsuario = await Usuario.findById(id);
            
    if( !existeUsuario ) 
    {
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    esRolvalido,
    emailExiste,
    existeUsuarioporID
};