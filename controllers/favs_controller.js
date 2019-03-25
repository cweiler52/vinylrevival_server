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
            res.status(500).send(err);
        }
    );
})

/* CHECKS TO SEE IF USER IS ALREADY IN FAVS TABLE FOR THIS PRODUCT - HANDLES ADDING OR REMOVING FROM TABLE UPON RESULT */
router.post('/favs/handle', (req, res) => {
    db.Favs.findOne(
        { where: { userId: req.body.user_id, productId: req.body.product_id }}
    ).then(
        data => {
            // console.log(data)
            if(data === null) {
                // console.log('no record found - add');
                db.Favs.create({
                    userid:     req.body.user_id,
                    productid:  req.body.product_id,
                    userId:     req.body.user_id,
                    productId:  req.body.product_id
                }).then( 
                    createSuccess = (data) => {
                        res.status(200).json({
                            outcome: 1,
                            message: 'added fav'
                        });
                    },
                    createError = (err) => {
                        res.status(501).json(err);
                    }
                );
            }else{
                // console.log('record found - remove instead');
                db.Favs.destroy({
                    where: { userId: req.body.user_id, productId: req.body.product_id }
                }).then( 
                    deleteSuccess = (data) => {
                        res.status(200).json({
                            outcome: 0,
                            message: 'removed fav'
                        });
                    },
                    deleteError = (err) => {
                        res.status(501).json(err);
                    }
                );
            }
        },
        err => res.status(501).json({ 
            status: 501,
            message: 'Error in process of handling a fav click'
        })
    )
})

module.exports = router;