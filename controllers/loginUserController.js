const bcrypt = require("bcrypt")
const User = require("../models/User")

module.exports = (req, res) => {
    const { email, password } = req.body

    console.log(req.session.userId); // ตรวจสอบค่า session.userId ที่ถูกตั้งค่า

    User.findOne({ email: email }).then((user) => {
        console.log(user)

        if (user) {
            let cpm = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('/login')
                }
            })
        } else {
            res.redirect('/login')
        }
    })
}
