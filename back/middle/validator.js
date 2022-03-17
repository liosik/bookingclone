const validator = require("email-validator");
const userSchema = require("../schemas/userSchema");
const postSchema = require("../schemas/postSchema");


module.exports = {
    validateRegister: async (req, res, next) => {
        const {email, pw1, pw2} = req.body
        const users = await userSchema.find()
        const user = users.find(x => email === x.email)
        if (user) res.send({success: false, errorMessage: "EMAIL ALREADY REGISTRATED"})
        if (!(validator.validate(email))) return res.send({success: false, errorMessage: "EMAIL NOT VALID"})
        if (pw1 !== pw2) return res.send({success: false, errorMessage: "PASSWORDS DON'T MATCH"})
        next()
    },
    validateLogin: async (req, res, next) => {
        const {email, pw1} = req.body
        const users = await userSchema.find()
        const user = users.find(x => email === x.email)
        if (!user) return res.send({success: false, errorMessage: "USER NOT REGISTRATED"})
        if (!(validator.validate(email))) return res.send({success: false, errorMessage: "EMAIL NOT VALID"})
        if (pw1.length < 0 && pw1.length > 20) return res.send({success: false, errorMessage: "PASSWORD NOT VALID"})
        next()
    },
    validatePost: async (req, res, next) => {
        const {photo, price} = req.body
        const posts = await postSchema.find()
        const post = posts.find(x => photo === x.photo)
        if (!price) return res.send({success: false, errorMessage: "ADD PRICE"})
        if (post) return res.send({success: false, errorMessage: "PHOTO ALREADY EXISTS"})
        if (!(photo.includes("http"))) return res.send({success: false, errorMessage: "CHECK PHOTO URL"})
        next()
    },
}
