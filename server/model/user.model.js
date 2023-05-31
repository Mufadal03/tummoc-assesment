const { Schema, model } = require('mongoose')

const userModel = model('user', Schema({
    username: { type: String, required: true },
    email:{type:String,required:true},
    password: { type: String, required: true },
}, { versionKey: false }))

module.exports=userModel