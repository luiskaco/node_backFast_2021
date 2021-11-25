const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId, // Va ser de un tipo ojbeto id
        ref: 'Usuario',  // la referencia a donde va compararar el ID
        required: true
    },
    precio: {
        type: Number,
        default: 0
    }, 
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria', // La referencia a donde va compararar el ID
        required: true  // La categoria debe existir
    },
    descripcion:{
        type: String, 
        deafult:""   
    },
    disponible:{
        type: Boolean, 
        default: true
    }
});

/// editando metodo

ProductoSchema.methods.toJSON = function(){
    // Extraemos lo que no vamos a usar
    const {__v,  estado, ...data} = this.toObject();

    // Retornamos la categoria
    return data;

}

module.exports = model('Producto', ProductoSchema);