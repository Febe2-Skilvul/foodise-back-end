const Category = require("../models/category")
const databaseConnected = require("../config/database")
require('dotenv').config({ path: "./.env" })
const {MONGODB_URI} = process.env

const dataCreated = [
    new Category({
        _id : "1",
        name : "Main Dish"
    }),
    new Category({
        _id : "2",
        name : "Appetizer"
    }),
    new Category({
        _id : "3",
        name : "Dessert"
    }),
    new Category({
        _id : "4",
        name : "Beverage"
    }),
]

async function seederCreated() {
    try {
        await databaseConnected(MONGODB_URI)
        await dataCreated.map(async (data) => { 
            await data.save((result) => { 
                console.log(result)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

seederCreated()