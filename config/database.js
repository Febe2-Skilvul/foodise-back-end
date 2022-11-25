const mongoose = require("mongoose");

async function databaseConnected(uri, options) {
    return mongoose.connect(uri, options)
}

module.exports = databaseConnected;