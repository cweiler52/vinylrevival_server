const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* ALLOWS ADMIN TO VIEW COMMENTS OF ONE PRODUCT BY ID */
router.delete('/comments/:id', (req, res) => {
    db.Comments.destroy({
        where: { id: req.params.id }
    }).then(
        deleteSuccess = (commentid) => {
            res.status(200).send("comment was removed");
        },
        deleteError = (err) => {
            res.status(500).send(err.message);
        }
    );
});

/* GETS ALL PRODUCTS TO DISPLAY IN LIST /// ORDER BY later */
router.get('/comments/:pid', (req, res) => {
    db.Comments.findAll({
        where: { productId: req.params.pid },
        include: [
            {
                model: db.Products, attributes: [] 
            }
        ]
    }).then(
        commentsSuccess = (data) => {
            res.status(200).json(data);
        },
        commentsError = (err) => {
            res.status(500).send(err.message);
        }
    );
});

module.exports = router;