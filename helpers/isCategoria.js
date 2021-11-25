// Validamos existencia de la categoria

const { Categoria } = require("../models");


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

module.exports = {
    isCategoria
}