//const express = require('express')
//const router = express.Router()
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
        // 409 is conflict
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = { username, 'password': hashedpwd }

    //create and store a new user
    const user = await User.create(userObject)

    if (user) { //is created
        res.status(201).json({ message: `New user ${username} created` })
    }
    else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// router
//     .route("/:id")
//     .get((req, res) => {
//         res.send(`Get user with id ${req.params.id}`)
//     })
//     .put((req, res) => {
//         res.send(`Update user with id ${req.params.id}`)
//     })
//     .delete((req, res) => {
//         res.send(`Delete user with id ${req.params.id}`)
//     })

// router.param("id", (req, res, next, id) => {
//     next()
// })

//express goes top to bottom so any dynamic route should be located below a static one

module.exports = {
    getAllUsers,
    createNewUser
}