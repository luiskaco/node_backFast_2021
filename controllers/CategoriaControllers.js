
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

module.exports = {
    crearCategoria
}