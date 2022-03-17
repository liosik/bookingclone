const express = require('express')
const cors = require('cors')
const {v4: uuid} = require("uuid")
const app = express()
const mainRouter = require('./routes/mainRouter')
const session = require('express-session')
require('dotenv').config()


const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_KEY).then(() => {
    console.log("Database Connection OK")
}).catch(e => {
    console.log(e)
    console.log("connection failed")
})



app.use(express.json())


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.listen(4000)

app.use('/', mainRouter)

