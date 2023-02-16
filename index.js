const express = require('express')
const mongoose = require('mongoose');
const router = require('./routes/router');
const userrouter = require('./routes/userRoute');
const mailroute = require('./routes/mailer');
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(router)
app.use('/api',userrouter)
app.use('/api', mailroute)
// app.use(cors({ origin: 'http://127.0.0.1:3000' }))
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/Database')
    .then(() => console.log("connected to db"))
    .catch((e) => console.log(e))



app.listen(8081, () => {
    console.log("listening to http://localhost:8080")
})