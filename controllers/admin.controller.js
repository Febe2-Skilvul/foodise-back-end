const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { tokenGenerated } = require("../middleware/index")

module.exports = {
    signinAdmin: async (request, response) => {
        try {
            let { email, password } = request.body;
            const admin = await Admin.findOne({ email:email })
            if (admin) {
                const passwordChecked = bcrypt.compareSync(password, admin.password);

                if (passwordChecked) {
                    const token = {
                        _id: admin._id,
                        role: "admin",
                    }
                    const tokenCreated = tokenGenerated(token)
                    response.status(200).send({ 
                        message: "login admin success, welcome !",
                        token: tokenCreated,
                        email: admin.email,
                        password: admin.password
                    })
                    
                } else {
                    response.status(400).send({
                        message: 'your password went wrong'
                    })
                }
            } else {
                response.status(400).json({
                    message: 'admin isnt exist'
                })
            }

        } catch (error) {
            response.status(500).send({ error })
        }
    }
}