// imPORTACIONES D ENODE AL INICIO

    // Improtamos path para url
    const path = require('path');

    // File Sistem
    const fs = require('fs');


const {response} = require('express');

// importamos helper
const {subirArchivo} = require('../helpers');

// importando modelo
const {Usuario, Producto} = require('../models');
const { collection } = require('../models/role');


// Importamos claudinary 

const cloudinary = require('cloudinary').v2;

    // configurando la autenticacion
    cloudinary.config( process.env.CLOUDINARY_URL)



const cargarArchivo = async (req , res = response) => {

   
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //   res.status(400).json({msg:'No hay archivos en la peticion.'});
    //   return;
    // }

    try {
        // const nombre = await subirArchivo(req.files, ['txt','md'] , 'textos');
        const nombre = await subirArchivo(req.files, undefined , 'img');

        res.json({
            nombre
        })

    } catch (msg) {
        res.status(400).json({
            msg
        })
    }
   
}   

// Subir archivo usuario - forma nativa con paquete

const actualizarImagen = async (req, res = response) => {


    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({msg:'No hay archivos en la peticion.'});
    //     return;
    //   }

    // extraemos de la ruta
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id);

                // Validamos si existe
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    })
                }

            break;

        case 'producto':
            modelo = await Producto.findById(id);

                // Validamos si existe
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`
                    })
                }

            break;

        default:

            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
            break;
    }

    // Limpiar imagenes previas
    if(modelo.img){
         // Todo  boorar la iamgen del servidor

         const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

         // Si existe la imagen
        if(fs.existsSync(pathImagen)){
            // Eliminamos
            fs.unlinkSync(pathImagen)
        }

    }


    
    // Guardamos la url en el modelo}   funcion (ARCHIVO, EXTENCIONS; CARPETA)
    const nombre = await subirArchivo(req.files, undefined , coleccion);

    // ASignamos
    modelo.img = nombre 

    // Guardamos
    await modelo.save();


    res.json({modelo})


}


// Consultar imagenes subidas

const mostrarImagen = async (req, res = response) => {

    
      // extraemos de la ruta
      const {coleccion, id} = req.params;

      let modelo;
  
      switch (coleccion) {
          case 'usuario':
              modelo = await Usuario.findById(id);
  
                  // Validamos si existe
                  if(!modelo) {
                      return res.status(400).json({
                          msg: `No existe un usuario con el id ${id}`

                          /**
                           * Retornar un placeholder
                           */
                      })
                  }
  
              break;
  
          case 'producto':
              modelo = await Producto.findById(id);
  
                  // Validamos si existe
                  if(!modelo) {
                      return res.status(400).json({
                          msg: `No existe un producto con el id ${id}`
                      })
                  }
  
              break;
  
          default:
  
              return res.status(500).json({
                  msg: 'Se me olvido validar esto'
              })
              break;
      }
  
      // Limpiar imagenes previas
      if(modelo.img){
           // Todo  boorar la iamgen del servidor
  
           const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
  
           // Si existe la imagen
          if(fs.existsSync(pathImagen)){
              
               // devolvemos la imagen
              return res.sendFile(pathImagen)
          }
      }

      // Imagen estatica
      const pathImagenStatic = path.join(__dirname, '../assets', 'no-image.jpg');

      // Devolvemos imagen estatica
      return res.sendFile(pathImagenStatic)
    //   res.json({msg: 'Falta place holder', pathImagenStatic})
}



// Actualizar imagenes con claudinary 

const actualizarImagenClaudinary = async (req, res = response) => {


    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({msg:'No hay archivos en la peticion.'});
    //     return;
    //   }

    // extraemos de la ruta
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id);

                // Validamos si existe
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    })
                }

            break;

        case 'producto':
            modelo = await Producto.findById(id);

                // Validamos si existe
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`
                    })
                }

            break;

        default:

            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
            break;
    }

    // Limpiar imagenes previas
    if(modelo.img){
        
        // Cortamos la url
        const nombreArr = modelo.img.split('/');
        // obtenemos el ultimo que contiene el id
        const nombre = nombreArr[nombreArr.length - 1]

        // Desestructuramos cortando
        const [public_id] = nombre.split('.')

        // console.log(public_id)

        // Eliminamos de claudinary
        cloudinary.uploader.destroy(public_id);

    }

    // Extramoe la ruta temporal
    const { tempFilePath } = req.files.archivo;

        // Caludinary 
     const {secure_url} = await cloudinary.uploader.upload(tempFilePath);



    // ASignamos
    modelo.img = secure_url 

    // Guardamos
    await modelo.save();


    res.json({modelo})


}




module.exports =  {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenClaudinary
}