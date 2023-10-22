const allowedOrigins = require('./allowedOrigins')

const corsOptions  = {
    origin: (origin, callback) => {
        if ( allowedOrigins.indexOf(origin) == -1 || !origin ) {
            callback(null, true)
        }
        else {
            callback( new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
    //status code 200 indicates 200
}

module.exports = corsOptions