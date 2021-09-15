
/**
 *   Nota: las importaciones de tercero siempre van dtras de las importantes de node que lleve require
 * 
 */

// importanmos 
require('dotenv').config(); // config para que tome todas las variables de entorno;

// importamos server
const Server = require('./models/server');

// instnciamos el server
const server = new Server();


// Llamamos el metodo
server.listen();

