module.exports = (req, res) => {

    let email = ''
    let password = ''
    let data = req.flash('data')

    if (typeof data != "undefined") {
        email = data.email
        password = data.password
    }

    res.render('register' , {
        errors: req.flash('validationErrors'),
        email: email,
        password: password

    })
}