const mongoose = require('mongoose')
const { Schema } = mongoose

const resepSchema = new Schema({
    portion: {
        type : Number
    },
    nutriScore: {
        type: Number
    },
    overview: [{
        type : String,
        required: true
    }],
    ingredient: [{
        type : String
    }],
    timeServing: {
        type: Number
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