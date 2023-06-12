const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")
const expressSession = require("express-session")
const flash = require("connect-flash")

mongoose.connect("mongodb+srv://admin:1234@cluster0.0sj5h6b.mongodb.net/?retryWrites=true&w=majority" , {
    useNewUrlParser: true
})

global.loggedIn = null

// controller
const indexController = require("./controllers/indexController")
const loginController = require("./controllers/loginController")
const registerController = require("./controllers/registerController")
const storeUserController = require("./controllers/storeUserController")
const loginUserController = require("./controllers/loginUserController")
const logoutController = require("./controllers/logoutController")
const aboutController = require("./controllers/aboutController")

// middleware
const authRedirect = require("./middleware/authRedirect")
const authAbout = require("./middleware/authAbout")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(expressSession({
    secret: "node secret",
    resave: true,
    saveUninitialized: true
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
} )    

app.set("view engine", "ejs")

//route
app.get('/', indexController)
app.get('/about',authAbout, aboutController)
app.get('/login',authRedirect, loginController)
app.get('/register',authRedirect, registerController)
app.post('/user/register',authRedirect, storeUserController)
app.post('/user/login',authRedirect, loginUserController)
app.get('/logout',logoutController)

app.listen(4000, () => {
    console.log('App listening on port 4000')
})