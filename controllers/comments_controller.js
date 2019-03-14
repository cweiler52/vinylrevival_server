const express  = require('express');
const router = express.Router();
const Comments = require('../db').import('../models/comments');
//const db = require('../db').db;

/* GETS ALL PRODUCTS TO DISPLAY IN LIST /// ORDER BY later */
router.get('/comments', (req, res) => {
    Comments.findAll( // ,
        // include: [
        //     {
        //         model: db.Favs,
        //         where: { productId: db.Favs.Id } 
        //     }
        // ]
    ).then( 
        findAllSuccess = (data) => {
            res.status(200).json(data);
        },
        findAllError = (err) => {
            res.status(500).send(err.message);
        }
    );
})

module.exports = router;