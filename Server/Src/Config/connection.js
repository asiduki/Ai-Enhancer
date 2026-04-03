require("dotenv").config();
const mongoose = require('mongoose');
const dbgr = require('debug')('app:mongoose-connection')

try {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>dbgr("connected"))
    .catch((err)=>dbgr(`This is the error :- \n ${err}`))
    console.log("Connected to mongodb")
}

catch(err) {
    console.log("Error While connecting database")
}

module.exports = mongoose.connection;