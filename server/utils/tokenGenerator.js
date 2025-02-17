import jwt from "jsonwebtoken"

const generateToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        // Generated token is set as cookie
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Sets the lifetime of the cookie to 7 days (in milliseconds)
            httpOnly: true, // prevent XSS
            sameSite: "strict", // prevent CSRF
            secure: process.env.NODE_ENV !== "development" // This flag ensures that the cookie is only sent over HTTPS connections. It is set to true in production (when NODE_ENV is not "development").
        })

        return token

    } catch (error) {
        console.error("Error generating the token: ", error.message)
    }
}

export default generateToken