const express = require('express')
const Users = require('../models/db')
const bcrypt = require('bcrypt')
const router = express.Router()
const nodemailer = require('nodemailer')
router.post('/signup', async (req, res) => {

    try {


        // sending mail from testing account

        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        let message = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world I am seeking how to right it?", // plain text body
            html: "<b>Hello kay re  world?</b>", // html body
        };

        transporter.sendMail(message)
        .then((info)=>{
            return res.status(201).json({
                msg:"You should receive an email",
                info:info.messageId,
                preview:nodemailer.getTestMessageUrl(info)
            })
        })
        .catch(e=>{return res.status(500).json({e})})


    //     const { name, email, password, conpass } = req.body;

    //     const hashPass = await bcrypt.hash(password, 10)
    //     const user = await Users.findOne({ email })

    //     if (user) {
    //         res.status(401).send({ msg: "user already exists" })
    //     } else {
    //         if (password === conpass) {

    //         }
    //         const adduser = new Users({
    //             name, email, password: hashPass, conpass
    //         })
    //         await adduser.save()
    //             .then(user => res.json({ user, msg: "user created successfully" }))
    //             .catch(err => res.status(404).json({ err, msg: "user not created" }))
        // }
    } catch (error) {
        return res.status(404).json(error)
    }
})


router.post('/signin', (req, res) => {
    const { email } = req.body;
    Users.findOne({ email })
        .then(result => res.json(result))
        .catch(e => console.log(e))
})


router.get('/getuser/:id', async (req, res) => {
    try {
        const { id } = req.params

        const user = await Users.findById({ _id: id })
        if (user) {
            res.json(user)
        } else {
            res.json({ error: "user not found" })
        }

    } catch (error) {
        return res.status(404).json(error)
    }
})

//update user

router.patch('/update/:id', async (req, res) => {
    const { id } = req.params

    const updateuser = await Users.findByIdAndUpdate(id, req.body)
    if (updateuser) {
        res.json({ updateuser, msg: "user updated" })
    } else {
        res.json({ msg: "user not updated" })
    }

})


// delete user

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteuser = await Users.findByIdAndDelete({ _id: id })

        res.json(deleteuser)
        if (deleteuser) {
            res.status(201).json({ msg: "User deleted successfully" })
        } else {
            res.status(401).json({ msg: "User not deleted" })
        }
    } catch (error) {
        res.status(401).json({ error })

    }
})

module.exports = router