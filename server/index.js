const express = require('express')
const { connection } = require('./config/db')
const { userController } = require('./controllers/user.controller')
const { authenticator } = require('./middleware/authentication')
const { dashboardController } = require('./controllers/dashboard.controller')
const OauthController = require('./controllers/0auth.controller')
const passport = require("passport");
const session = require('express-session');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors());
app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session())



app.get('/', (req, res) => {
    res.status(200).send({message:'running successfully'})
})

app.use('/user',userController)
app.use('/dashboard',authenticator, dashboardController)
app.use('/auth/google',OauthController)


app.listen(8000,async() => {
    try { 
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log('failed to connect',error.message)
    }
    console.log("running on http://localhost:8000")
})      