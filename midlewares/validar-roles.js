const { response } = require("express");


const esAdminRole = (req, res = response, next) => {

     // ejecutar sin verificar el token primero
    if(! req.usuario){
        return res.status(500).json({  // Error 500 de interna error | Error propio
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    // Desestructuramos el usuario
    const { role, nombre  } = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} No es administrador - No puede realizar esta operación`
        })
    }

    
    next();
}

// Funcion de objeto |spreat operator
const tieneRole = (...roles) => {

    // Nota; devolvemos una funcion como lo require express req, res
    return (req, res = response, next) => {
        console.log(roles, req.usuario.role)


             // ejecutar sin verificar el token primero
            if(! req.usuario){
                return res.status(500).json({  // Error 500 de interna error | Error propio
                    msg: 'Se quiere verificar el role sin validar el token primero'
                });
            }

            // Verificamos que incluya el role
            if(! roles.includes(req.usuario.role)){
                return res.status(401).json({
                    msg: `El servicio requiere uno de estos roles ${roles}`
                })
            }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}

