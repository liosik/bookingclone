const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    secret: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('userSchema', userSchema)