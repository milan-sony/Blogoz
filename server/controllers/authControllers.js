import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/tokenGenerator.js"

// user signup
export const signup = async (req, res) => {
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

        // check if the user already exists
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: "A user with this email already exists"
            })
        }

        // if user not found hash the password save user data to db and send verification email to the user
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            // generate token
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                status: 201,
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                message: "Account successfully created"
            })
        } else {
            res.status(400).json({
                status: 400,
                message: "Something went wrong, account not created"
            })
        }
    } catch (error) {
        console.error("Error signing up user, ", error.message)
        return res.status(500).json({
            status: 500,
            message: "Error signing up user",
            error: error.message
        })
    }
}