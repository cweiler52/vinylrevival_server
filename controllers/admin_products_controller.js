const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* ALLOWS ADMIN TO CREATE A PRODUCT ... */
router.post('/products/add', (req, res) => { 
    db.Products.create({
        artist: req.body.artist,
        album:  req.body.album,
        cover:  req.body.cover,
        price:  req.body.price,
        desc:   req.body.desc
    })
    .then(
        createSuccess = (data) => {    
            res.status(200).json({
                outcome: 1,
                data: data,
                message: 'product was created.'
            })
        },
        createError = err => res.status(500).send(err.message)
    )
})

/* GETS ALL PRODUCTS TO DISPLAY IN LIST /// ORDER BY later */
router.get('/products', (req, res) => {
    db.Products.findAll({
        order: [
            ['album', 'ASC']
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

/* GETS ONE PRODUCT TO DISPLAY IN ADMIN EDIT VIEW */
router.get('/products/:id', (req, res) => {
    db.Products.findOne({
        where: { id: req.params.id },
        include: [
            { model: db.Comments }
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

/* ALLOWS ADMIN TO VIEW DETAILS OF ONE PRODUCT BY ID */
router.delete('/products/:id', (req, res) => {
    db.Products.destroy({
        where: { id: req.params.id }
    }).then(
        deleteShowSuccess = (productid) => {
            res.status(200).send("product was removed");
        },
        deleteShowError = (err) => {
            res.status(500).send(err.message);
        }
    );
});

/* ALLOWS ADMIN TO UPDATE DETAILS OF ONE PRODUCT BY ID */ 
router.put('/products/:id', (req, res) => {
    let prod_id     = req.params.id,
        prod_artist = req.body.artist,
        prod_album  = req.body.album,
        prod_cover  = req.body.cover,
        prod_price  = req.body.price,
        prod_desc   = req.body.desc;

    db.Products.update({
        artist: prod_artist,
        album: prod_album,
        cover: prod_cover,
        price: prod_price,
        desc: prod_desc
    },
    {where: {id: prod_id}}
    ).then(
        function updateSuccess() {
            res.status(200).send("product was updated");;
        },
        function updateError(err) {
            res.status(500).send(err.message);
        }
    )
});

module.exports = router;