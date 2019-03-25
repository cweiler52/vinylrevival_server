const express  = require('express');
const router = express.Router();
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const db = require('../db').db;

/* ALLOWS A NEW USER TO BE CREATED WITH A USERNAME & PASSWORD */
router.post('/signup', (req, res) => {
    db.Users.create({
        name:   req.body.name,
        email:  req.body.email,
        image:  req.body.image,
        passwordhash: bcryptjs.hashSync(req.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })
            if (token) {
                res.status(200).json({
                    user: user,
                    message: 'user created',
                    sessionToken: token
                })
            }else{
                res.status(501).json({ 
                    status: 501,
                    message: 'Failed to process' 
                })
            }
        },
        createError = err => res.status(500).json({ 
            status: 500,
            message: err.message
        })
    )
});

/* ALLOWS LOG IN WITH AN EXISTING USER */
router.post('/login', (req, res) => {
    db.Users.findOne({ where: { email: req.body.email }})
    .then(
        user => {
            if (user) {
                bcryptjs.compare(req.body.password, user.passwordhash, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })
                        res.status(200).json({
                            status: 200,
                            message: 'Successfully authenticated',
                            user: {
                                "id": user.id,
                                "name": user.name,
                                "email": user.email,
                                "roleid": user.roleid,
                                "image": user.image
                            },
                            sessionToken: token 
                        })
                    }else{
                        res.status(502).json({ 
                            status: 502,
                            message: 'Seems like your password is wrong.' 
                        })
                    }
                })
            } else {
                res.status(500).json({ 
                    status: 500,
                    message: 'We didn\'t recognize your username.' 
                })
            }
        },
        err => res.status(501).json({ 
            status: 501,
            message: 'Failed to process'
        })
    )
})

module.exports = router;