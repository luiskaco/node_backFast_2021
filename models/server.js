// Importamos express
const express = require('express')

// importando cors
const cors = require('cors');
const { dbCnnnection } = require('../database/config.db');

// Creando clase de server
class Server {

    constructor(){
        // inicializamos express
        this.app = express();
        // puerto
        this.port = process.env.PORT;

        // mapa de ruta
        this.usuariosPath = '/api/usuarios';  // Rutas para usuarios

            this.authPath = '/api/auth';  // Rutas para autenticacion

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
    }


    // metodo
    route() {
        // usando un middlerea para el llmado de rutas
        this.app.use(this.authPath , require('../routes/auth'))

        this.app.use(this.usuariosPath , require('../routes/usuarios'))
    }

    listen(){
         
        this.app.listen(this.port , () => {
                 console.log('Servidor correindo en el puerto ' + this.port)
        })
    }

}

module.exports = Server;