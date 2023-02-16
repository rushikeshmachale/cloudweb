
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const { EMAIL, PASSWORD } = require('../env.js')


const mail = (req,res)=>{


    const { email } = req.body


    console.log(email)
    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "MYAPP",
            link: "rushisportfolio.netlify.app"
        }
    })


    let otpval = Math.floor(Math.random() * 1000000)

    let response = {
        body: {
            name: email,
            intro: "Your order has arrived please collect it",
            table: {
                data: [{
                    item: "Puma Shoes",
                    description: "Sport shoes confortable",
                    price: "₹ 750",
                }]
            },
            outro: `OTP for collecting your order is <b> ${otpval} <b/>.
            <br/>
            <br/>
            Looking for to order more!`,
            // outro: "",
        }
    }
    
    let mail = MailGenerator.generate(response)

    let message = {
        from: EMAIL,
        to: email,
        subject: "Place order",
        html: mail
    }

    transporter.sendMail(message)
        .then(() => { return res.status(201).json({otpval}) })
        .catch(e => { return res.status(501).json(e) })
}


module.exports = {
    mail
}