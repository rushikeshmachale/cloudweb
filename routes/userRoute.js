const express = require("express")
const bcrypt = require('bcrypt')
const Usersdb = require("../models/userdb")

const router = express.Router()
router.put('/put', (req, res) => {
    console.log("first")
})


router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, conpass } = req.body


        if ((!name || !email || !password || !conpass)) {
            res.status(401).json({ msg: "all fields are required" })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = await Usersdb.findOne({ email })

        // if (!user) {
        //     const newUser = new Usersdb({
        //         name, email, password: hashPass, conpass
        //     })
        //     console.log(req.body)
        //     await newUser.save()
        //     .then(res=>{

        //         // res.header("Access-Control-Allow-Origin","http://localhost:3000");
        //         res.status(201).json({ msg: "user created" })
        //     }
        //              )
        //         .catch(e => res.status(404).send(e))
        // } else {
        //     res.status(403).json({ error, msg: "user already exists" })

        // }
        if(!user){
            try{
                const newUser=new Usersdb({name,email,password:hashPass,conpass})
                if(newUser){
                    newUser.save();
                    res.status(201).json({message:'User created successfully'})
                }
             
            }catch(error){
               res.status(400).json(error)
            }
        }
    } catch (error) {
        res.status(401).json({ error, msg: "couldn't signup" })
    }
})


router.route('/login').post(async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body

        Usersdb.findOne({ email: email }, async (err, user) => {
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const {  name, email, password, conpass } = user
                    return res.status(201).json({user:{name,email,password,conpass}})
                } else {
                    return res.status(404).send({ msg: "user not found" })
                }
            } else {
                return res.status(405).json({ msg: "wrong credentials" })
            }
        })
    } catch (error) {
        // console.log(error)
        return res.status(403).json({ error})
    }
})



// router.post('/login', (req, res) => {
//     console.log("first")
// })


module.exports = router