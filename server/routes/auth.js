import express from "express"
import { signup } from "../controllers/authControllers.js"


const authRoute = express.Router()

// user signup
authRoute.post("/signup", signup)

export default authRoute