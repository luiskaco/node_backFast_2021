const { response } = require('express');
const { Producto } = require('../models');


const crearProducto = async (req, res = response) => {


    const {estado, usuario, ...body} = req.body;
      // nota: ignoramos estado u usauro

    try {
        
        // todo - revisar si existe una categoria
        const productoDB = await Producto.findOne({nombre:body.nombre})

            // todo - Si no existe
            if (productoDB){
                return res.status(400).json({
                    msg: `El producto ${productoDB.nombre}, ya existe`
                })
            }
            // Veri¿ufuadi exustebcua

            // todo - Preparar data
            const data = {
                nombre: body.nombre.toUpperCase(),
                usuario: req.usuario._id,
                ...body
            }
    
            // Guardando
            const producto = new Producto(data);
            await producto.save();


        res.status(200).json({
            msg: "Llegado correctamente",
            data
        })



    } catch (error) {
        res.status(400).json({
            msg: "Tenemos un problema interno"
        })
    }

  
}

// ObtenerCategoria - Paginado - total - populate
const obtenerProductos = async (req, res = response) => {

    const {limite=5, desde=0} = req.query;
    const query = {estado:true}

    
    try {
        
        // CRAMOS uN ARREGLO DE PROMESAS
        const [total, producto] = await Promise.all([   
            
            Producto.countDocuments(query), 

            Producto.find(query)
                .populate('usuario', 'nombre') // Busca la referencia  '
                 // El segundo parametro filtra los campos que se requiere
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))

                /** 
                 *  Nota_ eñ  promise all ejecuta las promesas en simultaneos. Todas deben finalizar, si una falla todas daran error.
                 */
            ])
    
        res.status(201).json({
            total, 
            producto
        })

    } catch (error) {
            res.status(400).json({
            msg: "Tenemos un problema interno"
        })
    }
} 


// ObtenerCategoria - populate {}
const obtenerProducto = async (req, res = response) => {
    
    const {id} = req.params;

    try {
        const {nombre, usuario} = await Producto.findById(id)
                        .populate('usuario', 'nombre')
                        .populate('categoria', 'nombre')

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
const actualizarProducto = async (req, res = response) => {
    // Extramos id
    const  {id} = req.params;


    // Evitar parametros adicionaesl
    const {estado, usuario, ...data} = req.body;
        // nota: extramos estado y usurio, todo lo demas lo guardamos en data por segurida

   
    // Comprabamos si viene
    if(data.nombre) {
         // colocamos el nombre en mayuscula
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.usuario._id;


    try {

        const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

        res.json(producto)
    
        
    } catch (error) {
        res.json({
            msg: "Tenemos un problema"
        })
    }


}


// Borrar Categoria - estado.false
const eliminarProducto = async (req, res = response) => {
    try {
        
        const  {id} = req.params;

        const productoBorrada = await Producto.findByIdAndUpdate(id, {estado: false},{new:true})

        res.status(200).json({
            productoBorrada
        })

    } catch (error) {
        res.json({
            msg: "Tenemos un problema"
        })
    }
}

module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto
}