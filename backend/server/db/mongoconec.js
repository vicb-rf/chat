const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            // useFindModify: false
            });
            console.log('Db online...')


    }catch(error){
        console.log(error)
        throw new Error('Error al conectar a la db')
    }

}

module.exports = dbConnection 