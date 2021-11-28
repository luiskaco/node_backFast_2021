// Importamos express
const express = require('express')

// importando cors
const cors = require('cors');
const { dbCnnnection } = require('../database/config.db');

// Importando paquete de file upload
const fileUpload = require('express-fileupload');

// Creando clase de server
class Server {

    constructor(){
        // inicializamos express
        this.app = express();
        // puerto
        this.port = process.env.PORT;

        // mapa de ruta - Forma 1
        // this.usuariosPath = '/api/usuarios';  // Rutas para usuarios

        //     this.authPath = '/api/auth';  // Rutas para autenticacion

        // Forma 2 - Creando u objeto de ruta
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',    
            uploads: '/api/uploads'    
        }
          
        // Conectar a BD
        this.conectarDB();

             // middleware
            this.middlewares();

        this.route();

    }

    async conectarDB() {
        await dbCnnnection()
        /*
          Nota: Podemos realizar diferentes llamado de db aqui
        **/
    }

    // Nota: los midleware pueden ser ubicado en la ruta o como funcion
    middlewares(){

        // DEFINIENDO MIDDLEARE GLOBALES

        // Habilitando el cors
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json()) // Definimo el tipo de datos que se recibira

        // Directorio publico
        this.app.use( express.static('public'))


        // NPara manejar la carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true // Permite crear carpeta si no existe.

            //Nota: Es importante tener cuidado con esa activacion
        }));

        /**
         * Nota: se necesita para aceptar ppetiionces  via rest
         */
    }


    // metodo
    route() {
        // usando un middlerea para el llmado de rutas
        // this.app.use(this.authPath , require('../routes/auth'))
        // this.app.use(this.usuariosPath , require('../routes/usuarios'))
       
        // usando un middlerea para el llmado de rutas
        this.app.use(this.paths.auth , require('../routes/auth'))
        this.app.use(this.paths.buscar , require('../routes/buscar'))
        this.app.use(this.paths.productos , require('../routes/productos'))
        this.app.use(this.paths.categorias , require('../routes/categorias'))
        this.app.use(this.paths.usuarios , require('../routes/usuarios'))
        this.app.use(this.paths.uploads , require('../routes/upload'))

        
    
    }

    listen(){
         
        this.app.listen(this.port , () => {
                 console.log('Servidor correindo en el puerto ' + this.port)
        })
    }

}

module.exports = Server;