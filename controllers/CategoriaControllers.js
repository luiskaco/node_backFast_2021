
const { response } = require('express');
const { Categoria} = require('../models');

const crearCategoria = async (req, res = response) => {

    //todo - Extrar nobmre
    const nombre = req.body.nombre.toUpperCase();

    // todo - revisar si existe una categoria
    const categoriaDB = await Categoria.findOne({nombre})

    // todo - Si no existe
    if (categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    try {
        
          // todo - Generar la data a guarda
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        // Guardando
        const categoria = new Categoria(data);
        await categoria.save();

        res.status(201).json(categoria)

    } catch (error) {
        return res.status(400).json({
            msg: `Error al almacenar la informacion`
        })
    }

}

// ObtenerCategoria - Paginado - total - populate
const obtenerCategoria = async (req, res = response) => {

        const {limite=5, desde=0} = req.query;
        const query = {estado:true}

          // CRAMOS uN ARREGLO DE PROMESAS
          const [total, categorias] = await Promise.all([   
            
            Categoria.countDocuments(query), 

            Categoria.find(query)
                .populate('usuario', 'nombre') // Busca la referencia  '
                 // El segundo parametro filtra los campos que se requiere

                .skip(Number(desde))
                .limit(Number(limite))

                /** 
                 *  Nota_ eñ  promise all ejecuta las promesas en simultaneos. Todas deben finalizar, si una falla todas daran error.
                 */
            ])
    
        res.status(201).json({
            total, 
            categorias
        })


}

// ObtenerCategoria - populate {}
const obtenerCategoriaP = async (req, res = response) => {
    
    const {id} = req.params;

    try {
        const {nombre, usuario} = await Categoria.findById(id).populate('usuario', 'nombre')

        res.status(201).json({
            msg: "Llegaste correctamente",
            id,
            nombre,
            usuario
     
        })
    } catch (error) {
        res.json({
            msg: "Tenemos un problema"
        })
    }
 

}

// Actualizar categoria
const actualizarCategoria = async (req, res = response) => {
    // Extramos id
    const  {id} = req.params;

    // Evitar parametros adicionaesl
    const {estado, ususario, ...data} = req.body;
        // nota: extramos estado y usurio, todo lo demas lo guardamos en data

    // colocamos el nombre en mayuscula
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;


    try {

        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

        res.json(categoria)
    
        
    } catch (error) {
        res.json({
            msg: "Tenemos un problema"
        })
    }


}

// Borrar Categoria - estado.false
const eliminarCategoria = async (req, res = response) => {
    try {
        
        const  {id} = req.params;

        const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false},{new:true})

        res.status(200).json({
            categoriaBorrada
        })

    } catch (error) {
        res.json({
            msg: "Tenemos un problema"
        })
    }
}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategoriaP,
    actualizarCategoria,
    eliminarCategoria
}