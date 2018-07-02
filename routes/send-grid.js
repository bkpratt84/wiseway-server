var express = require('express')
var router = express.Router()
var validation = require('../middleware/verifyToken')

router.use(validation.verifyToken)

router.get('/', function(req, res) {
    res.send('Made it to the user!')
})
