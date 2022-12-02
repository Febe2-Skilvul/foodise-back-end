const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({
    email: {
        type : String,
        maxlengh : 255,
        required : true
    },
    password: {
        type : String,
        maxlengh : 255,
        required : true
    }
}, {
    timestamps: true,
    versionKey: false
})

const adminModel = mongoose.model("Admin", adminSchema)

module.exports = adminModel