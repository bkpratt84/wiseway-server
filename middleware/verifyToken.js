var jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token']

        if (token) {
            jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
                if (err) {
                    return res.status(401).json({
                        title: 'Not Authenticated',
                        success: false,
                        error: 'Failed to authenticate token.'
                    })
                } else {
                    req.decoded = decoded
                    next()
                }
            });
        } else {
            return res.status(401).json({
                title: 'Not Authenticated',
                success: false,
                error: 'No token provided.'
            })
        }
    }
}
