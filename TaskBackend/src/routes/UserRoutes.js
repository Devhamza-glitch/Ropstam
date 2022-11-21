import express from 'express'
import * as userController from '../controller/UserController.js'

const router = express.Router()

// user routes
router.post('/create', userController.createUser)
router.post('/login', userController.loginUser)


export {router}