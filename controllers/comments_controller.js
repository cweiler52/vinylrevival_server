const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* GETS ALL COMMENTS FROM THE ALBUM TO DISPLAY IN LIST BASED ON productid /// ORDER BY later */
router.get('/comments/:pid', (req, res) => {
    db.Comments.findAll({
        where: { productId: req.params.pid },
        include: [
            { model: db.Products, attributes: [] },
            { model: db.Users }
        ],
        order: [
            ['createdAt', 'DESC']
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

module.exports = router;