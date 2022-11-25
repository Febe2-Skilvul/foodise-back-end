const mongoose = require('mongoose')
const { Schema } = mongoose

const foodSchema = new Schema({
    name: {
        type : String,
        maxlengh : 255,
        required : true
    },
    image: {
        type: String,
        maxlength: 255,
        required: true
    },
    category: {
        type : String,
        ref : "Category"
    },
    kalori: {
        type : Number,
        required : true
    },
    protein: {
        type : Number,
        required : true
    },
    karbohidrat: {
        type : Number,
        required : true
    },
    lemak: {
        type : Number,
        required : true
    },
    deskripsi: {
        type : String
    },
    manfaat: {
        type : String
    },
    bahaya: {
        type : String
    }
}, {
    timestamps: true,
    versionKey: false
})

const foodModel = mongoose.model("Food", foodSchema)

module.exports = foodModel