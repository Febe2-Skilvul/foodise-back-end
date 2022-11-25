const mongoose = require('mongoose')
const { Schema } = mongoose

const resepSchema = new Schema({
    porsi: {
        type : Number
    },
    image: {
        type: String,
        maxlength: 255,
        required: true
    },
    overview: {
        type : String,
        required: true
    },
    bahan: [{
        type : String
    }],
    waktu: {
        type : Number
    },
    food: {
        type : mongoose.ObjectId,
        ref: "Food"
    }
}, {
    timestamps: true,
    versionKey: false
})

const resepModel = mongoose.model("Resep", resepSchema)

module.exports = resepModel