var express = require('express')
var router = express.Router()
var validation = require('../middleware/verifyToken')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

router.post('/authenicate', function(req, res) {
    // User.findOne({email: req.body.email}, function(err, user) {
    //     if (err) {
    //         return res.status(500).json({
    //            title: 'An error occurred',
    //            error: err 
    //         });
    //     }

    //     if (!user) {
    //         return res.status(401).json({
    //             title: 'Login Failed',
    //             error: {message: 'Invalid Login'}
    //         });
    //     }

    //     if (!bcrypt.compareSync(req.body.password, user.password)) {
    //         return res.status(401).json({
    //             title: 'Login Failed',
    //             error: {message: 'Invalid Login'}
    //         });
    //     }

    //     user.password = null;
    //     var token = jwt.sign(
    //         { user: user },
    //         req.app.get('secretKey'),
    //         { expiresIn: 7200 }
    //     );

    //     res.status(200).json({
    //         message: 'Successfully logged in',
    //         token: token,
    //         user: user
    //     });
    // });
});

router.post('/testUser', function(req, res) {
    // var user = new User({
    //     firstName: 'Brandon',
    //     lastName: 'Pratt',
    //     email: 'bkpratt84@gmail.com',
    //     password: bcrypt.hashSync('password', 10)
    // });

    // user.save();
    // res.status(201).json({
    //     success: true,
    //     error: null
    // });
})

//router.use(validation.verifyToken);

// router.get('/', function(req, res) {
//     res.send('Made it to the user!');
// });

module.exports = router
