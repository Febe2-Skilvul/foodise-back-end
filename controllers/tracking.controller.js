const { tokenReturned } = require("../middleware")
const { totalNutri, findByDate } = require("../middleware/calculate")
const Tracking = require("../models/tracking")

module.exports = {
    addTracking: async (request, response) => {
        const { data } = tokenReturned(request, response)
        const userId = data._id
        let {food, totCal, totCarbon} = request.body
        try {
            const trackExist = await Tracking.findOne({user: userId})
            let today = new Date()
            today = today.toLocaleDateString('fr-CA')
            time = new Date().toLocaleTimeString()

            food.map(item => item.time = time)

            const tracking = {
                date: today,
                food: food,
                totCal: totCal,
                totCarbon: totCarbon
            }

            if (trackExist) {
                const trackingIndex = findByDate(trackExist.tracking, today)

                if (trackingIndex > -1) {
                    food.map(item => trackExist.tracking[trackingIndex].food.push(item))
                    trackExist.tracking[trackingIndex].totCal += totCal
                    trackExist.tracking[trackingIndex].totCarbon += totCarbon

                    await trackExist.save()

                } else {
                    trackExist.tracking.push(tracking)
                    await trackExist.save()
                }

                response.send({ message: 'tracking added successfully', tracking})

            } else {
                const newTrack = {
                    user: userId,
                    tracking: [tracking]
                }
                const dataSaved = new Tracking(newTrack)
                await dataSaved.save()
                response.send({ message: "tracking added successfully", newTrack})
            }

            
        } catch (error) {
            response.status(500).send({error: error.message})
        }

    },

    getTracking: async (request, response) => {
        const { data } = tokenReturned(request, response)
        const userId = data._id
        try {
            const tracking = await Tracking.findOne({user: userId}).populate({
                path: 'tracking',
                populate: {
                    path: "food",
                    populate: "foodId"
                }
            })
            response.send(tracking)
        } catch (error) {
            response.status(500).send({ error: error.message })
        }

    },

    trackingToday: async (request, response) => {
        const { data } = tokenReturned(request, response)
        const userId = data._id
        let today = new Date()
        today = today.toLocaleDateString('fr-CA')
        let todayTrack = null
        try {
            const tracking = await Tracking.findOne({user: userId}).populate({
                path: 'tracking',
                populate: {
                    path: "food",
                    populate: "foodId"
                }
            })
            if (tracking) {
                const todayTracking = findByDate(tracking.tracking, today)

                if (todayTracking > -1) {
                    todayTrack = tracking.tracking[todayTracking]
                }
            
                const {totCarb, totProtein, totFat} = totalNutri(todayTrack)
            
                response.send({
                    _id: tracking._id,
                    user: tracking.user,
                    tracking: todayTrack,
                    totCarb: totCarb,
                    totProtein: totProtein,
                    totFat : totFat
                })
            } else {
                response.send(null)
            }
        } catch (error) {
            response.send(500).send({ error: error.message })
        }
    },

    trackingPerDate: async (request, response) => {
        const { data } = tokenReturned(request, response)
        const userId = data._id

        let { date } = request.params
        let dateTrack = null

        try {
            if(!date) {
                return response.status(400).send({ message: "please choose the date !"})
            }

            const tracking = await Tracking.findOne({user: userId}).populate({
                path: "tracking",
                populate: {
                    path: "food",
                    populate: "foodId"
                }
            })

            if (tracking) {
                const dateTracking = findByDate(tracking.tracking, date)

                if (dateTracking > -1) {
                    dateTrack = tracking.tracking[dateTracking]
                }
                const { totCarb, totFat, totProtein } = totalNutri(dateTrack)

                response.send({
                    _id: tracking._id,
                    user: tracking.user,
                    tracking: dateTrack,
                    totCarb: totCarb,
                    totProtein: totProtein,
                    totFat: totFat
                })
            } else {
                response.send(null)
            }

        } catch (error) {
            response.status(500).send({error: error.message})
        }

    }
}