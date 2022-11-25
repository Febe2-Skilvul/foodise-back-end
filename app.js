const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const databaseConnected = require("./config/database");
const allRouter = require('./routes')
require("dotenv").config();
const { MONGODB_URI } = process.env

async function server() {
    try {
        await databaseConnected(MONGODB_URI)
        const app = express()
        const port = process.env.PORT || 7000
        app.use(bodyparser.json())
        app.use(bodyparser.urlencoded({ extended: false }))
        app.use(cors())
        app.use(allRouter)
        app.listen(port, () => {
            console.log('server running at http://localhost:'+ port)
        })
    } catch (error) {
        console.log("server: ", error)
    }
}

server()

// const port = process.env.PORT || 7000;

// app.use(express.json())
// app.use(allRouter)

// database.then(() => {
//     console.log('connect database successfully !');
// }).catch((error) => {
//     console.log(error);
// })

// app.listen(port, () => {
//     console.log('server running at http://localhost:'+ port)
// })