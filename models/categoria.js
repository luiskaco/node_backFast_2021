const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
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
    }
});

/// editando metodo

CategoriaSchema.methods.toJSON = function(){
    // Extraemos lo que no vamos a usar
    const {__v,  estado, ...data} = this.toObject();

    // Retornamos la categoria
    return data;

}

module.exports = model('Categoria', CategoriaSchema);