import express from "express"

const authRoute = express.Router()

// user signup
authRoute.get("/signup", (req, res) => {
    try {
        const { name, email, password } = req.body

        // check empty input fields
        if (!name) {
            return res.status(400).json({
                status: 400,
                message: "Name field is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                status: 400,
                message: "Email field is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: 400,
                message: "Password field is required"
            })
        }

        // check password length
        if (password.length < 6) {
            return res.status(400).json({
                status: 400,
                message: "Password must be atleast 6 character"
            })
        }
    } catch (error) {

    }
})

export default authRoute