const express = require('express')
const { connection } = require('./config/db')
const { userController } = require('./controllers/user.controller')
const { authenticator } = require('./middleware/authentication')
const { dashboardController } = require('./controllers/dashboard.controller')
const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).send({message:'running successfully'})
})

app.use('/user',userController)
app.use('/dashboard',authenticator, dashboardController)



app.listen(8000,async() => {
    try { 
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log('failed to connect',error.message)
    }
    console.log("running on http://localhost:8000")
})      