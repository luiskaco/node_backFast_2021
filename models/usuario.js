const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique:true,
    },
    password:{
        type:String,
        required: [true, 'la contraaseña es obligatorio'],
    },
     password:{
        type:String,
    },
     role:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE'], // Que contenga
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    },
});

module.exports = model('Usuario', UsuarioSchema); 

// Se configura en singlugar el nombre de la conexion