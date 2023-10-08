const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    res.send("User List")
})

router.get("/new", (req, res) => {
    res.send("Create User")
})

router
    .route("/:id")
    .get((req, res) => {
        res.send(`Get user with id ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update user with id ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete user with id ${req.params.id}`)
    })

router.param("id", (req, res, next, id) => {
    next()
})

//express goes top to bottom so any dynamic route should be located below a static one
module.exports = router