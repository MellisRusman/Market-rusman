const mongoose = require("mongoose")


const dbConection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log('Base de datos conectada con el servidor')
    } catch (error) {
        console.log(error)
        throw new Error("Error al conectar la base de datos con el servidor")
    }
}


module.exports = {
    dbConection
}