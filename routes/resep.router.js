const express = require('express')
const resepRoute = express.Router();

const { 
    getAll, 
    getById,
    getByFoodId,
    add,
    edit
} = require('../controllers/resep.controller')

const { onlyAdmin, tokenVerified } = require("../middleware")



resepRoute.get("/", getAll)
resepRoute.get("/:id", getById)
resepRoute.get("/food/:food", getByFoodId)
resepRoute.post("/", [tokenVerified, onlyAdmin], add)
resepRoute.patch("/:id", [tokenVerified, onlyAdmin], edit)



module.exports = resepRoute