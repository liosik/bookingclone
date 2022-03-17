const {v4: uuid} = require("uuid")
const userSchema = require("../schemas/userSchema")
const postSchema = require("../schemas/postSchema")


module.exports = {
    register: (req, res) => {
        const {email, pw1, isAdmin} = req.body
        const user = new userSchema()
        user.email = email
        user.password = pw1
        user.isAdmin = isAdmin
        user.secret = uuid()
        console.log(req.session)
        user.save().then(() => {
            console.log("User registered")
        })
        res.send({success: true})
    },
    login: async (req, res) => {
        const {email, stayLogged} = req.body
        const users = await userSchema.find()
        const user = users.find(x => email === x.email)
        const posts = await postSchema.find()
        if (user) {
            console.log("User Logged in")
            stayLogged ? req.session.email = email : req.session.email = null
            return res.send({success: true, user, posts})
        } else {
            res.send({success: false, errorMessage: "BAD CREDENTIALS"})
        }
    },
    check: async (req, res) => {
        const {userSecret} = req.body
        const users = await userSchema.find()
        const user = users.find(x => userSecret === x.secret)
        const posts = await postSchema.find()
        if (user) {
            res.send({success: true, user, posts})
        } else {
            res.send({success: false, errorMessage: "PLEASE LOG IN"})
        }


    },
    addPost: async (req, res) => {
        const {photo, price, city, reserved} = req.body
        const post = new postSchema()
        post.photo = photo
        post.price = price
        post.city = city
        post.reserved = reserved
        post.save().then(() => {
            console.log("Post Added")
        })
        const posts = await postSchema.find()

        res.send({success: true, posts})
    },

    addReservation: async (req, res) => {
        const {id, reservations} = req.body
        console.log(reservations)
        postSchema.updateOne(
            {_id: id},
            {$set: {"reserved": reservations}},
            ()=>{
                console.log("Reservation Made")},
        )
        const posts = await postSchema.find()
        res.send({success: true, posts})
    }
}