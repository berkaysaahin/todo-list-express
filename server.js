require('dotenv').config()
const express = require('express')
const app = express()
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbaseConn')
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname,'public')))

app.use('/', require('./routes/root'))

const userRouter = require("./routes/userRoutes")

app.use("/users", userRouter )

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(__dirname, 'views', '404.html')
    }
    else if(req.accepts('json')) {
        res.json({message: '404 Not Found'})
    }
    else {
        res.type('txt').json({ message: '404 Not found'})
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => console.log(err))
