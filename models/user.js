const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type : String,
        maxlength: 100,
        required : true
    },
    email: {
        type : String,
        maxlength: 150,
        required : true
    },
    gender: {
        type: String,
        enum: ["laki-laki", "perempuan"]
    },
    password: {
        type : String,
        maxlength: 255,
        required : true
    },
    tracking_nutrisi: {
        type: mongoose.ObjectId,
        ref: "NutriTracking"
    },
    tracking_carbon: {
        type: mongoose.ObjectId,
        ref: "CarbonTracking"
    },
    tinggi: {
        type: Number,
        maxlength: 3
    },
    berat: {
        type: Number,
        maxlength: 3
    },
    levelAktivitas: {
        type: Object
    },
    umur : {
        type : Number,
        maxlength: 3
    }, 
    caloriNeeded : {
        type : Number
    }, 
    proteinNeeded : {
        type : Number
    }, 
    fatNeeded : {
        type : Number
    },
    carboNeeded : {
        type : Number
    },  
}, {
    timestamps: true,
    versionKey: false
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel