const {response} = require('express');

// Extrayendo el objetid
const {ObjectId} = require('mongoose').Types;

// Modelos
const {Usuario, Categoria, Producto} = require('../models');

// Coleciones permitidas
const coleccionesPermitidas = [
    'usuario',
    'categoria',
    'producto',
    'role'
];

// Primera busqueda
const buscarUsuario = async (termino = '' , res = response) => {
    
    const esMongoID = ObjectId.isValid(termino); // true

    // Veriricar id de mongo
    if(esMongoID){
        const usuario = await Usuario.findById(termino);

        res.json({
            results: (usuario) ? [usuario] : [] 
        })
    }  

    // Expresion regular | para hacer busqueda  insensible a mayuscula y minusculas

    const regex = RegExp(termino, 'i')

    // Buscar por correo o usuario

    // const usuarios = await Usuario.find({nombre: regex})

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}], // Condiciones
        $and: [{estado:true}] // Condicion obligatoria
    })
    
    res.json({
        results: usuarios
    });
}

const buscarCategoria = async (termino = '' , res = response) => { 
    const esMongoID = ObjectId.isValid(termino); // true

    // Veriricar id de mongo
    if(esMongoID){
        const categoria = await Categoria.findById(termino);

        res.json({
            results: (categoria) ? [categoria] : [] 
        })
    } 

    // Expresion regular | para hacer busqueda  insensible a mayuscula y minusculas

    const regex = RegExp(termino, 'i')

    const categoria = await Categoria.find({nombre: regex ,estado:true})
    
    res.json({
        results: categoria
    });

}

buscarProducto = async (termino = '' , res = response) => { 
    const esMongoID = ObjectId.isValid(termino); // true

    // Veriricar id de mongo
    if(esMongoID){
        const producto = await Producto.findById(termino)
                                        .populate('usuario', 'nombre')
                                        .populate('categoria', 'nombre')

        res.json({
            results: (producto) ? [producto] : [] 
        })
    } 

    // Expresion regular | para hacer busqueda  insensible a mayuscula y minusculas

    const regex = RegExp(termino, 'i')

    const producto = await Producto.find({nombre: regex ,estado:true})
                                            .populate('usuario', 'nombre')
                                            .populate('categoria', 'nombre')
    
    res.json({
        results: producto
    });
}



const buscar = (req, res = response) => {

    //Extraemos
    const {coleccion, termino} = req.params;   // paramtros definidos en la ruta

    // todo : Verificar colecciones permitdiad
    if( !coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `El ${coleccion} no esta dentro de Las coleciones permitidas son: ${coleccionesPermitidas}` 
        });
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuario(termino, res);

            break;
        case 'categoria':
            buscarCategoria(termino, res);
            break;
        case 'producto':
            buscarProducto(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'No esta agreda la coleccion en la busqueda',
                coleccion,
                termino
            });
         break;
    }
  
}

const buscarProductoCategoria  = async (req, res = response) => {
    let regex
            //Extraemos
        const {termino} = req.params;   // paramtros definidos en la ruta

        const esMongoID = ObjectId.isValid(termino); // true

        // Veriricar id de mongo
        if(esMongoID){
             regex = termino;
             

        }else{
             regex = RegExp(termino, 'i')
        } 
        

       

        const listaProductos = await Producto.find({categoria: regex ,estado:true})
                                            .populate('usuario', 'nombre')
                                            .populate('categoria', 'nombre')

        res.json({
            msg: `llegaste`,
            listaProductos
        })
}


module.exports = {
    buscar,
    buscarProductoCategoria
}