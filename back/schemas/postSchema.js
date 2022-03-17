const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    reserved: {
        type: [{}],
        required: true
    }
})


module.exports = mongoose.model('postSchema', postSchema)