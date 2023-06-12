const User = require("../models/User")

module.exports = (req,res,next) => {
    User.findById(req.session.userId).then((user) => {
        if(!user) {
            return res.redirect('/')
        }
        console.log("User logged in success fully")
        next()
    }).catch(error => {
        console.error(error)
    })
}