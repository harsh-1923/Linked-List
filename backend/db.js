const config = require("./client/config.json");
const mongoose = require('mongoose');
const mongoURL = config.MONGODB_URL;


const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;