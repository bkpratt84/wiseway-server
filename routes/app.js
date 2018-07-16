var express = require('express')
var router = express.Router()

router.all('*', function (req, res) {
    res.status(401).json({
        title: 'Route does not exist.',
        status: false,
        error: 'Route does not exist.'
    })
})

module.exports = router
