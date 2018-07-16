require('now-env')

const express = require('express')
const bodyParser = require('body-parser')
//const morgan = require('morgan')

//const admin = require('firebase-admin')

const appRoutes = require('./routes/app')
const sendGridRoutes = require('./routes/send-grid')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(morgan('dev'))

let isDev = process.env.environment !== 'production'

app.use(function(req, res, next) {
    let origin = null
    let reqOrigin = req.headers.origin
    let allowedOrigins = process.env.Origin.split(' ')

    if (isDev) {
        origin = '*'
    } else {
        if (allowedOrigins.length > 0) {
            if (allowedOrigins.indexOf(reqOrigin) > -1) {
                origin = reqOrigin
            }
        }
    }

    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

    if ('OPTIONS' == req.method) {
        res.sendStatus(200)
    } else {
        next();
    }
});

// admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.Firebase_ProjectID,
//       clientEmail: process.env.Firebase_ClientEmail,
//       privateKey: process.env.Firebase_PrivateKey
//     }),
//     databaseURL: process.env.Firebase_DatabaseURL,
//     storageBucket: process.env.Firebase_StorageBucket
// })

app.use('/sendgrid', sendGridRoutes)
app.use('*', appRoutes)

app.listen(port, function () {
    console.log('Server started at http://localhost:' + port)
})
