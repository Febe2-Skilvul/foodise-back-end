const Category = require("../models/category")
const databaseConnected = require("../config/database")
require('dotenv').config({ path: "./.env" })
const {MONGODB_URI} = process.env

const dataCreated = [
    new Category({
        _id : "maindish",
        name : "Main Dish"
    }),
    new Category({
        _id : "appetizer",
        name : "Appetizer"
    }),
    new Category({
        _id : "dessert",
        name : "Dessert"
    }),
    new Category({
        _id : "beverage",
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