const Food = require("../models/food")

module.exports = {
    getAll: async (request, response) => {
        try {
            const food = await Food.find().populate("category")
            response.send(food)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },

    getSearch: async (request, response) => {
        try {
            const food = await Food.find({name : { $regex : request.query.name, $options: 'i' } }).populate("category")
            if (food.length == 0) {
                response.status(404).send({ message: "Oops, Not Found"})
            } else {
                response.send(food)
            }
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },

    getById: async (request, response) => {
        try {
            const food = await Food.findOne({ _id: request.params.id }).populate("category")
            response.send(food)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },

    getByCategory: async (request, response) => {
        try {
            const food = await Food.find({ category: request.params.category }).populate("category")
            response.send(food)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },
    

    // admin accessibility
    addMany: async (request, response) => {
        try {
            const data = await Food.insertMany(request.body)
            response.status(201).send({
                message: "food added successfully",
                data
            })
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },
    edit: async (request, response) => {
        try {
            const { id } = request.params
            const update = request.body
            if (Object.keys(update).length === 0) {
                response.send({ message: "there is nothing to update "})
            } else {
                const foodUpdated = await Food.updateOne({ _id: id }, update)
                response.send({ 
                    message: "update success", 
                    foodUpdated
                })
            }
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    }
}