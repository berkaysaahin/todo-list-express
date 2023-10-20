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

const getOneUser = asyncHandler(async (req, res) => {
    
})

const updateUser = asyncHandler(async (req, res) => {
    const {id, username, password} = req.body

    //does the user exist to update
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: "User not found"})
    }

    //check for duplicate
    const duplicate = await User.findById({username}).lean().exec()

    //allow updates to the original user
    if(duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate username"})
    }

    user.username = username

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated`})

})

const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    //confirming data
    if (!id) {
        res.status(400).json({message: "User ID required"})
    }

    //does the user exist
    const user = await User.findById(id).exec()

    if(!user) {
        res.status(400).json({message: "User not found"})
    }

    const result = await user.deleteOne()

    const reply = `Username ${reply.username} with ID ${reply._id} deleted`

    res.json(reply)
})
//express goes top to bottom so any dynamic route should be located below a static one

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}