require("dotenv").config();
const { MONGODB_URI } = process.env

const mongoose = require("mongoose");

const database_url = process.env.MONGODB_URI 

const database = mongoose.connect(database_url)

module.exports = database;