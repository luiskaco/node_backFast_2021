// importamos express para que nos ayude a encontrar la respuest http
const {response} = require('express'); // Importante

// importamos bcrypjs
const bcryptjs = require('bcryptjs');

// importamos mdoelos
const Usuario = require('../models/usuario');

// Importamos helpr con la funcion de generar json
const { generarJWT } = require('../helpers/generarJWT');



const login = async (req, res = response) => {

    const {correo, password} = req.body;

    // To do : Veriificar si el usuario esta activo
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

    // To do : Comprobar si el usuario esta activo

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado = false'
            })
        }

    // To do : Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
                            
        // bcryptjs.compareSync: Sirve para comparar la contraseña ingresada con la guardada

        // NOta: Toda esta consulta es realizada de manera asincrona

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }


    // To do : Generar JWT
        const token = await generarJWT(usuario._id);

        try {
            
            res.json({
                msg: 'Login ok',
                usuario,
                token
            });

        } catch (error) {

            console.log(error)

            res.status(500).json({
                msg: 'Hable con el administrador'
            })
            
        }


}
 
module.exports = {
    login
}