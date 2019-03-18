const express  = require('express');
const router = express.Router();
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
// const Users = require('../db').import('../models/users');
const db = require('../db').db;

/* GETS ALL FAVS TO DISPLAY PER USER /// ORDER BY later */
router.get('/user/:id', (req, res) => {
    db.Users.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: db.Favs,
                include: [
                    {
                        model: db.Products
                    }
                ]
            }
        ]
    }).then( 
        findAllSuccess = (data) => {
            let eachfav = [];
            for(let a of data.favs) {
                record = {
                    "id": a.product.id,
                    "artist": a.product.artist,
                    "album": a.product.album,
                    "cover": a.product.cover
                }
                eachfav.push(record);
            }
            res.status(200).json({
                user: {
                    "id": data.id,
                    "name": data.name,
                    "email": data.email,
                    "roleid": data.roleid,
                    "image": data.image
                },
                favs: eachfav
            });
        },
        findAllError = (err) => {
            res.status(500).send(err.message);
        }
    );
})

module.exports = router;