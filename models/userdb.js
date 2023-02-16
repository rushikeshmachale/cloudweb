const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conpass: {
        type: String,
        required: true
    }
})

const Usersdb = mongoose.model('userdb', userSchema)

module.exports = Usersdb