var express = require('express')
var router = express.Router()

router.all('*', function (req, res) {
    res.status(401).json({
        title: 'Not Authenticated',
        status: false,
        error: 'Route does not exist.'
    })
})

module.exports = router
