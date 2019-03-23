const express  = require('express');
const router = express.Router();
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const db = require('../db').db;

/* GETS ONE USER TO DISPLAY PROFILE BASED ON userid */
router.get('/profile/:id', (req, res) => {
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
        findOneSuccess = (data) => {
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
        findOneError = (err) => {
            res.status(500).send(err.message);
        }
    );
})

/* ALLOWS USER TO UPDATE THEIR PROFILE BASED ON USER id */ 
router.put('/profile/:id', (req, res) => {
    let user_id    = req.params.id,
        user_name  = req.body.name,
        user_email = req.body.email,
        user_image = req.body.image;

    db.Users.update({
        name:  user_name,
        email: user_email,
        image: user_image
    },
    { where: {id: user_id} }
    ).then(
        updateSuccess = (data) => {    
            res.status(200).json({
                user: {
                    "id": data.id,
                    "name": data.name,
                    "email": data.email,
                    "roleid": data.roleid,
                    "image": data.image
                }
            });
        },
        updateError = (err) => {
            res.status(500).send(err.message);
        }
    )
});

/* ALLOWS USER TO DELETE THEIR PROFILE BASED ON USER id */
router.delete('/profile/:id', (req, res) => {
    db.Users.destroy({
        where: { id: req.params.id }
    }).then(
        deleteSuccess = (data) => {
            res.status(200).json(data);
        },
        deleteError = (err) => {
            res.status(500).send(err.message);
        }
    );
});

module.exports = router;