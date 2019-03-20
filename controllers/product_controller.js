const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* GETS ALL PRODUCTS TO DISPLAY IN LIST /// ORDER BY later */
router.get('/products', (req, res) => {
    db.Products.findAll({
        order: [
            ['album', 'ASC']
        ],
        include: [
            { model: db.Favs }//,
            //{ model: db.Comments }
        ]
    }).then( 
        findAllSuccess = (data) => {
            res.status(200).json(data);
        },
        findAllError = (err) => {
            res.status(500).send(err.message);
        }
    );
})

router.get('/products/:id', (req, res) => {
    db.Products.findOne({
        where: { id: req.params.id },
        include: [
            { model: db.Favs },
            { model: db.Comments,
                include: [
                    { model: db.Users }
                ]
            }
        ]
    }).then( 
        findAllSuccess = (data) => {
            res.status(200).json(data);
            // let eachfav = [];
            // for(let a of data.favs) {
            //     record = {
            //         "id": a.product.id,
            //         "artist": a.product.artist,
            //         "album": a.product.album,
            //         "cover": a.product.cover
            //     }
            //     eachfav.push(record);
            // }
            // res.status(200).json({
            //     user: {
            //         "id": data.id,
            //         "name": data.name,
            //         "email": data.email,
            //         "roleid": data.roleid,
            //         "image": data.image
            //     },
            //     favs: eachfav
            // });
        },
        findAllError = (err) => {
            res.status(500).send(err.message);
        }
    );
})

/* GETS ALL PRODUCTS TO DISPLAY IN LIST /// ORDER BY later */
router.get('/products/suggestions/:id/:genre', (req, res) => {
    db.Products.findAll({
        where: { 
            genre: req.params.genre, 
            id: { [db.sequelize.Op.ne]: req.params.id } 
        },
        attributes: { 
            include: [[db.sequelize.fn("COUNT", db.sequelize.col("favs.id")), "favCount"]] 
        },
        include: [{
            model: db.Favs, attributes: []
        }],
        group: ['products.id']
    }).then( 
        findAllSuccess = (data) => {
            res.status(200).json(data);
        },
        findAllError = (err) => {
            res.status(500).send(err.message);
        }
    );
})

module.exports = router;