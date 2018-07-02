var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var jwt = require('jsonwebtoken')

var appRoutes = require('./routes/app')
var userRoutes = require('./routes/user')
var sendGridRoutes = require('./routes/send-grid')

var app = express()

var port = process.env.PORT || 3000

app.set('secretKey', process.env.secret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

let isDev = process.env.environment === 'production'

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

app.use('/user', userRoutes)
app.use('/sendgrid', sendGridRoutes)
app.use('*', appRoutes)

app.listen(port, function () {
    console.log('Server started at http://localhost:' + port)
})
