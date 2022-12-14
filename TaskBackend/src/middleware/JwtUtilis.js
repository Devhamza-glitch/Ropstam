import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateAuthToken = async (user) => {
    const payload = {_id: user._id, email: user.email}
    return jwt.sign({payload}, process.env.TOP_SECRET, {expiresIn: 18000})
}

export const verifyAuthToken = () => {
    return (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(403).send({message: 'Token not found'})
        } else {
            const tokenBody = token.slice(7)
            jwt.verify(tokenBody, process.env.TOP_SECRET, (err) => {
                if (err) {
                    return res.status(401).send({status: 401, message: 'Expire token, access denied'})
                }
                next()
            })
        }
    }
}