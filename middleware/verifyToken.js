var admin = require('firebase-admin')

module.exports = {
    verifyToken: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token']
        
        if (token) {
            admin.auth().verifyIdToken(token)
            .then(function(decodedToken) {
                var uid = decodedToken.uid
                next()
            }).catch(function(error) {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    success: false,
                    error: 'Failed to authenticate token.'
                })
            })
        } else {
            return res.status(401).json({
                title: 'Not Authenticated',
                success: false,
                error: 'No token provided.'
            })
        }
    }
}
