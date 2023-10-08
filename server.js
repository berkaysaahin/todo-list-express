require("dotenv").config()
const express = require('express')
const app = express()
const connectDB = require('./config/dbaseConn')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()
app.get('/', (req, res) => {
    console.log('hi')
    res.send('hi')
})

const userRouter = require("./routes/users")
app.use("/users", userRouter )

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => console.log(err))
