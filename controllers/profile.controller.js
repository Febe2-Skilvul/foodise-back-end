const User = require("../models/user")
const bcrypt = require("bcrypt")
const { tokenReturned } = require("../middleware")

module.exports = {
    get : async (request, response) => {
        const {data} = tokenReturned(request, response)
        const userId = data._id
        try {
            const profile = await User.findOne({_id : userId})
            response.send(profile)
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }, 

    editProfile : async  (request, response) => {
        const {data} = tokenReturned(request, response)
        const userId = data._id
        const changeProfile = request.body
        try {
            if (Object.keys(changeProfile).length !== 0) {
                let {
                    username,
                    gender,
                    tinggi,
                    berat,
                    umur,
                    levelAktivitas,
                } = changeProfile
                levelAktivitas = Number(levelAktivitas)
                let ket = ""
                switch (levelAktivitas) {
                    case 1.2:
                        ket = "aktivitas sangat ringan (0 x olahraga / minggu)";
                        break;
                    case 1.4:
                        ket = "aktivitas ringan (1-3 x olahraga / minggu)";
                        break;
                    case 1.5:
                        ket = "aktivitas sedang (3-5 x olahraga / minggu)";
                        break;
                    case 1.7:
                        ket = "aktivitas berat (5-6 x olahraga / minggu)";
                        break;
                    case 1.9:
                        ket = "aktivitas sangat berat (2 x olahraga / sehari)";
                        break;
                    default:
                        ket = "aktivitas tidak ada";
                        break;
                }
                levelAktivitas = {
                    val: levelAktivitas,
                    ket: ket
                }
                let bmr = 0;
                if (gender === "laki-laki") {
                    bmr = 665 + 13.7 * berat + 5 * tinggi - 6.8 * umur;
                } else {
                    bmr = 655 + 9.5 * berat + 1.8 * tinggi - 4.7 * umur;
                }
                let caloriNeeded = bmr * levelAktivitas.val
                let carboNeeded = caloriNeeded * 0.65 / 4
                let proteinNeeded = caloriNeeded * 0.15 / 4
                let fatNeeded = caloriNeeded * 0.2 / 4

                const changeSuccess = {
                    username: changeProfile.username,
                    gender: changeProfile.gender,
                    tinggi: changeProfile.tinggi,
                    berat: changeProfile.berat,
                    umur: changeProfile.umur,
                    levelAktivitas: changeProfile.levelAktivitas,
                    caloriNeeded : caloriNeeded,
                    carboNeeded : carboNeeded,
                    proteinNeeded : proteinNeeded,
                    fatNeeded : fatNeeded
                }

                const changed = await User.updateOne({ _id: userId }, changeSuccess)
                response.send({ 
                    message: "profile has been changed successfully",
                    changeSuccess
                })
            } else {
                response.status(400).send({ message: "there is nothing to update" })
            }
        } catch (error) {
            response.status(500).send({
            error: error.message
            })
        }    
    }, 
    editAkun : async  (request, response) => {
        const {data} = tokenReturned(request, response)
        const userId = data._id
        const changeAccount = request.body
        try {
            if (Object.keys(changeAccount).length !== 0 && changeAccount.email && changeAccount.currentPassword && changeAccount.newPassword && changeAccount.confirmPassword) {
                const accountExist = await User.findOne({email: changeAccount.email})
                if (accountExist == null) {
                    const account = await User.findOne({_id: userId})
                    const dataCompared = bcrypt.compareSync(changeAccount.currentPassword, account.password)
                    if (dataCompared) {
                        if(changeAccount.newPassword !== changeAccount.confirmPassword) {
                            response.status(400).send({
                                message: "password confirmation went wrong"
                            })
                        } else {
                            let new_pw = bcrypt.hashSync(changeAccount.newPassword, 10)
                            const changed = {
                                email : changeAccount.email,
                                password : new_pw
                            }
                            const success = await User.findOneAndUpdate({_id: userId}, changed)
                            response.send({
                                message : "Email and Password have been Changed successfully",
                                changed
                            })
                        }
                    } else {
                        response.status(401).send({
                            message: "your password went wrong"
                        })
                    }
                } else {
                    return response.status(400).send({
                        message : "Email address have been registered"
                    })
                }
            } else {
                response.status(400).send({ message: "request cant be process due to incomplete data input" })
            }
        } catch (error) {
            response.status(500).send({
            error: error.message
            })
        } 
    },
    changePassword : async  (request, response) => {
        const {data} = tokenReturned(request, response)
        const userId = data._id
        const changeAccount = request.body
        try {
            if (Object.keys(changeAccount).length !== 0 && changeAccount.currentPassword && changeAccount.newPassword && changeAccount.confirmPassword) {
                
                const account = await User.findOne({_id: userId})
                const dataCompared = bcrypt.compareSync(changeAccount.currentPassword, account.password)
                if (dataCompared) {
                    if(changeAccount.newPassword !== changeAccount.confirmPassword) {
                        response.status(400).send({
                            message: "password confirmation went wrong"
                        })
                    } else {
                        let new_pw = bcrypt.hashSync(changeAccount.newPassword, 10)
                        const changed = {
                            password : new_pw
                        }
                        const success = await User.findOneAndUpdate({_id: userId}, changed)
                        response.send({
                            message : "Password have been Changed successfully",
                            success
                        })
                    }
                } else {
                    response.status(401).send({
                        message: "your password went wrong"
                    })
                }
            } else {
                response.status(400).send({ message: "request cant be process due to incomplete data input" })
            }
        } catch (error) {
            response.status(500).send({
            error: error.message
            })
        } 
    }
}