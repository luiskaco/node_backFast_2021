// umportmos moongse
const mongoose = require('mongoose')

const dbCnnnection = async () => {
    try {   

       await mongoose.connect(process.env.MONGO_CNN, {
         //   useCreatendex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
          //  useFindAndModify: false,   // Recomienda para usar ciertas funciones pasadas
       })

       console.log("base de datos online")
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbCnnnection
}