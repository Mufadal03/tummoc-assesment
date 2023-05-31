const { Schema, model } = require('mongoose')

const cityModel = model('city', Schema({
    city: { type: String, required: true },
    user: { type : Schema.Types.ObjectId, ref:'user'}
}, { versionKey: false }))

module.exports={cityModel}  