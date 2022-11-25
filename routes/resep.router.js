const express = require('express')
const resepRoute = express.Router();

const { 
    getAll, 
    getById,
    getByFoodId,
    add
} = require('../controllers/resep.controller')

const { onlyAdmin, tokenVerified } = require("../middleware")



resepRoute.get("/", getAll)
resepRoute.get("/:id", getById)
resepRoute.get("/food/:food", getByFoodId)
resepRoute.post("/", [tokenVerified, onlyAdmin], add)



module.exports = resepRoute