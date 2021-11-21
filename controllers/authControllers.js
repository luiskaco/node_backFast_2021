// importamos express para que nos ayude a encontrar la respuest http
const {response} = require('express'); // Importante

// importamos bcrypjs
const bcryptjs = require('bcryptjs');

// importamos mdoelos
const Usuario = require('../models/usuario');

// Importamos helpr con la funcion de generar json
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verif');
const usuario = require('../models/usuario');



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

    // Nota: igualamos el res = response, solo para que VScode nos ayude con el tipeado
const googleSingIn = async (req, res = response) => {
    
    // Capturando el token
    const { token_id } = req.body;

    // Extraemos informacion
    try {
        const {correo, img, nombre} = await googleVerify(token_id);
        // console.log(googleUser)

        // verificar si ya existe el usuario
        let usuario = await Usuario.findOne({correo});


            if (! usuario ){
                // Crear usuario
                const data = {
                    nombre, 
                    correo,
                    password: 'ghjklkjhgesdrtyujiklñ',
                    google:true,
                    role:"USER_ROLE"
                };

                //Creamos la instania del usuaio
                usuario = new Usuario(data);

                // Guardamos el usuario
                await usuario.save();

            }

            // Si el usuario de BD tiene el stado de false

            if(!usuario.estado){
                return res.status(401).json({
                    msg: 'Hablar con el administrador, usuario bloqueado'
                });
            }


               // To do : Generar JWT
                const token = await generarJWT(usuario._id);

                console.log(usuario)

                res.json({
                    msg: 'Todo Bien Google Singnins',
                    token,
                    usuario
                 
                })

    } catch (error) {
        console.log(error)

        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        });
    }



  
}
 
module.exports = {
    login,
    googleSingIn,
}