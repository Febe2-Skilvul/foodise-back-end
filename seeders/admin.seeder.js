const Admin = require("../models/admin")
const bcrypt = require("bcrypt")
const databaseConnected = require("../config/database")
require('dotenv').config({ path: "./.env" })
const {MONGODB_URI} = process.env

const dataCreated = [
    new Admin({
        email : "foodise@gmail.com",
        password : bcrypt.hashSync("foodise123", 10)
    })
]

async function seederCreated() {
    try {
        await databaseConnected(MONGODB_URI)
        const existData = await Admin.find()
        if(existData.length === 0) {
            await dataCreated.map(async (data) => {
                await data.save((result) => {
                    console.log(result)
                })
            })
        } else {
            console.log("data exist")
        }
    } catch (error) {
        console.log(error)
    }
}

seederCreated()