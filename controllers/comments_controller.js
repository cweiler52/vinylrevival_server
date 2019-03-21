const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* GETS ALL COMMENTS FROM THE ALBUM TO DISPLAY IN LIST /// ORDER BY later */
router.get('/comments/:pid', (req, res) => {
    db.Comments.findAll({
        where: { productId: req.params.pid },
        include: [
            {
                model: db.Products, attributes: [] 
            }
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