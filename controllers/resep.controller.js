const Resep = require("../models/resep")

module.exports = {
    getAll: async (request, response) => {
        try {
            const resep = await Resep.find().populate("food")
            response.send(resep)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },
    getById: async (request, response) => {
        try {
            const id = request.params.id
            const resep = await Resep.findOne({ _id: id}).populate("food")
            response.send(resep)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },

    getByFoodId: async (request, response) => {
        try {
            const resep = await Resep.findOne({ food: request.params.food }).populate("food")
            response.send(resep)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },

    // admin accessibility
    add: async (request, response) => {
        const data = request.body
        const resepExist = await Resep.findOne({ food: data.food })
        try {
            if (resepExist == null ) {
                const resepCreated = new Resep(data)
                await resepCreated.save()
                response.status(201).send({
                    message: "resep added successfully",
                    data
                })
            } else {
                response.status(400).send({
                    message: "food's recipe is exist"
                })
            }
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
                const resepUpdated = await Resep.findOneAndUpdate({ _id: id }, update)
                response.send({ 
                    message: "update success", 
                    resepUpdated
                })
            }
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    }
}