const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const database = require("./config/database");
const allRouter = require('./routes')

app.use(express.json())
app.use(allRouter)
const port = process.env.PORT || 7000;
database.then(() => {
    console.log('connect database successfully !');
}).catch((error) => {
    console.log(error);
})

app.listen(port, () => {
    console.log('server running at http://localhost:'+ port)
})

module.exports = app;