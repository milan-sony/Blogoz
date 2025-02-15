import express from "express"
import api from "./api/index.js"
import auth from "./auth.js"

const router = express.Router()

router.use("/api/v1", api)
router.use("/auth", auth)

const routes = router.use("/api", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "API works properly"
    })
})

export default routes;