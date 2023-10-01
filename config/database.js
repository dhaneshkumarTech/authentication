const mongoose = require('mongoose')


exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
            w: 'majority',
            wtimeout: 5000
        }
    })
        .then(() => {
            console.log("Sucessfully connected to MongoDb Database.")
        }).catch((err) => {
            console.log("Database connection failed.")
            console.log(err);
        })
};
