const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* GETS ALL FAVS TO DISPLAY PER USER /// ORDER BY later */
router.get('/favs/:id', (req, res) => {
    db.Favs.findAll({
        where: { userId: req.params.id },
        include: [
            { model: db.Products }
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

/* GETS ALL FAVS TO DISPLAY PER USER /// ORDER BY later */
router.post('/favs/save', (req, res) => {
    db.Favs.create({
        userid: req.body.user_id,
        productid: req.body.product_id,
        userId: req.body.user_id,
        productId: req.body.product_id
    }).then( 
        createSuccess = (data) => {
            res.status(200).json(data);
        },
        createError = (err) => {
            res.status(501).json({ 
                status: 501,
                message: err.message
            })
        }
    );
})

/* REMOVES THE FAV RECORD BASED ON userId & productId */
router.delete('/favs/remove', (req, res) => {
    db.Favs.destroy({
        where: { userId: req.body.user_id, productId: req.body.product_id }
    }).then( 
        deleteSuccess = (data) => {
            res.status(200).json(data);
        },
        deleteError = (err) => {
            res.status(501).json({ 
                status: 501,
                message: err.message
            })
        }
    );
})

module.exports = router;