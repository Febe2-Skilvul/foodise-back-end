const User = require("../models/user");
const bcrypt = require("bcrypt");
const { tokenGenerated } = require("../middleware/index")

module.exports = {
    signupAuth: async (request, response) => {
        try {
            let {
                email,
				username,
				gender,
				tinggi,
				berat,
				umur,
				password,
				levelAktivitas,
			} = request.body;
            levelAktivitas = Number(levelAktivitas)
            const emailExist = await User.findOne({email: email})

            let ket = ""
            if (emailExist === null) {
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
                password = bcrypt.hashSync(password, 10)
                const userAuth = new User({
                    username: username,
                    email: email,
                    gender: gender,
                    password: password,
                    tinggi: tinggi,
                    berat: berat,
                    umur: umur,
                    levelAktivitas: levelAktivitas,
                    caloriNeeded: caloriNeeded,
                    carboNeeded: carboNeeded,
                    proteinNeeded: proteinNeeded,
                    fatNeeded: fatNeeded,
                })
                const userSaved = await userAuth.save()
                const token = {
                    _id: userSaved._id,
                    role: "user"
                }
                const tokenCreated = tokenGenerated(token);
                response.status(201).send({
                    message: "success",
                    token: tokenCreated,
                    username: username,
                    email: email,
                    gender: gender,
                    password: password,
                    tinggi: tinggi,
                    berat: berat,
                    umur: umur,
                    levelAktivitas: levelAktivitas,
                    caloriNeeded: caloriNeeded,
                    carboNeeded: carboNeeded,
                    proteinNeeded: proteinNeeded,
                    fatNeeded: fatNeeded
                })
            } else {
                response.status(400).send({message : 'Alamat email sudah digunakan'})
            }

        } catch (error) {
            response.status(500).send({error: error.message})
        }
    },

    signinAuth: async (request, response) => {
        try {
            let { email, password } = request.body;
            const user = await User.findOne({ email:email })
            if (user) {
                const passwordChecked = bcrypt.compareSync(password, user.password);

                if (passwordChecked) {
                    const token = {
                        _id: user._id,
                        role: "user",
                    }
                    const tokenCreated = tokenGenerated(token)
                    response.status(200).send({ 
                        message: "login success, welcome !",
                        token: tokenCreated,
                        username: user.username,
                        email: user.email,
                        gender: user.gender,
                        password: user.password,
                        tinggi: user.tinggi,
                        berat: user.berat,
                        umur: user.umur,
                        levelAktivitas: user.levelAktivitas,
                        caloriNeeded: user.caloriNeeded,
                        carboNeeded: user.carboNeeded,
                        proteinNeeded: user.proteinNeeded,
                        fatNeeded: user.fatNeeded,
                    })
                    
                } else {
                    response.status(400).send({
                        message: 'your password went wrong'
                    })
                }
            } else {
                response.status(400).json({
                    message: 'user isnt exist'
                })
            }

        } catch (error) {
            response.status(500).send({ error })
        }
    }
}