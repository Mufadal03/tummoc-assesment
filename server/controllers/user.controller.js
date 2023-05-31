const { Router } = require('express')
const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
userController = Router()


userController.post('/signup', async(req, res) => {
    const { email, password, username } = req.body

    const user = await userModel.findOne({ $or: [{ email }, { username }] })

    if (user !== null) return res.status(400).send({ response: "User already exist", success: false })

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).send({ response: err.message, success: false })
            }
            const user = new userModel({ email, password: hash, username })
            await user.save()
            res.status(201).send({ response: "User created", success: true })
        })
    } catch (error) {
        res.status(500).send({ response: error.message, success: false })
    }
})



userController.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) return res.status(401).send({ response: 'Please Signup', success: false })
    const hashedPassword = user.password

    try {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (!result) return res.status(400).send({ response: 'Credentials are not matching', success: false })
            
            if (result) {
                jwt.sign({ userId: user._id, userEmail: user.email }, process.env.JWT_SECRET, (err,token) => {
                    res.cookie('jwttoken', token, {
                        httpOnly: false,
                        expires: new Date(Date.now() + 2692000000),
                        origin: 'http://localhost:3000',
                        sameSite: 'none',
                        secure: true
                    })
                    res.cookie('user', user,{
                        httpOnly: false,
                        expires: new Date(Date.now() + 2692000000),
                        origin: 'http://localhost:3000',
                        sameSite: 'none',
                        secure: true
                    })
                    res.status(200).send({ response: 'SignIn Successfull', token, success: true })
                })
            }
        })
    } catch (error) {
        res.status(400).send({ response: 'OOPS Something went wrong', success: false })
    }
})

module.exports={userController}