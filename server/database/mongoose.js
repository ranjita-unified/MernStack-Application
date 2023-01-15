const mongoose = require('mongoose');
const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database connected successfully');
    }
    catch(e) {
        console.log('Error while connecting with the database', e);
    }
}

module.exports = Connection;

