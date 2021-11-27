// Improtamos path para url
const path = require('path');

// Importando uuid
const { v4: uuidv4 } = require('uuid');


const {response} = require('express');

const cargarArchivo = (req , res = response) => {

   
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg:'No hay archivos en la peticion.'});
      return;
    }

    if (!req.files.archivo) {
        res.status(400).json({msg:'No hay archivos en la peticion.'});
        return;
      }
      
      // Extraemos archivo
    const { archivo } = req.files;

    // Separar ae string
    const nombreCortado = archivo.name.split('.')

    // Obtener la extension
    const extension = nombreCortado[nombreCortado.length-1] // obtenemos la ultima posicion

    // Validar las extenxion permitida

    const extensionesValidas = ['png','jpg', 'jpeg', 'git']

    if(!extensionesValidas.includes(extension)){
        return res.json({
            msg: `La extensión ${extension} no esta dentro de las permitida ${extensionesValidas}`
        })
        
    }

    // Creando nombre unico
    const nombreFinal = `${uuidv4()}'.'${extension}`;
      
    // Unimos la ruta
    // const uploadPath = path.join( __dirname , '../uploads/', archivo.name); // archivo.name = nombre del archvo original
    const uploadPath = path.join( __dirname , '../uploads/', nombreFinal);

    // nota: el __dirname llega hasta la carpeta controller
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
           console.log(err);
            return res.status(500).json({err});
      }
  
      res.json({msg: 'File uploaded to ' + uploadPath});
    });

 
}   

module.exports =  {
    cargarArchivo
}