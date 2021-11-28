
// Importando el modelo rol
const Role = require('../models/role');

// Importando el modelos
const {Usuario, Producto, Categoria} = require('../models');
const { collection } = require('../models/role');




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


/**
 *  Validadores de categoria
 */
 const isCategoria = async (id) => {

    // Consultar bd por el ID
    const existeCategoria = await Categoria.findById(id);

    //to do: Validar existencia
    if( !existeCategoria ){
        throw new Error(`La categoria ${id} no esta registrado en la BD`);
    }
    
}


/**
 *  Validadores de Producto
 */
 const isProducto = async (id) => {
 
    
    // Consultar bd por el ID
    const existeProducto = await Producto.findById(id);

    //to do: Validar existencia
    if( !existeProducto ){
        throw new Error(`el producto ${id} no esta registrado en la BD`);
    }
    
}


/**
 *  Validar las colecciones permitidas
 */

const coleccionesPermitidas = async(coleccion = '', colecciones = []) => {

    //  
    const incluida = colecciones.includes(coleccion)

    // Verificamos que exista
    if( !incluida ) {
        throw new Error(`La coleccion ${coleccion} no es permitida, estas son las colecciones: ${colecciones}`)
    }

    return true;

}


module.exports = {
    esRolvalido,
    emailExiste,
    existeUsuarioporID,
    isCategoria,
    isProducto,
    coleccionesPermitidas

};