const User = require('../models/User')

module.exports = (req, res) => {
    if(req.body.password == req.body.confirmpassword) {
        User.create(req.body).then(() => {
            console.log("User registered successfully!")
            res.redirect('/')
        }).catch((error) => {
            // console.log(req.body)
    
            if (error) {
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                return res.redirect('/register')
            }
        })
    }else {
        req.flash('data', req.body)
        return res.redirect('/register')
}
    
}