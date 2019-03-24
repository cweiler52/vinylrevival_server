const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* USER CREATED COMMENT FOR THE ALBUM TO DISPLAY IN LIST */
router.post('/comment/add', (req, res) => {
    db.Comments.create({
        userid: req.body.user_id,
        productid: req.body.product_id,
        userId: req.body.user_id,
        productId: req.body.product_id,
        comment: req.body.comment
    })
    .then(
        createSuccess = (data) => {    
            res.status(200).json({data});
        },
        createError = err => res.status(500).send(err.message)
    )
})

/* ALLOWS USER TO UPDATE ONE OF THEIR COMMENTS */ 
router.put('/comment/:id', (req, res) => {
    let comment_id = req.params.id,
        commentTxt = req.body.comment;

    db.Comments.update({
        comment: commentTxt
    },
    { where: {id: comment_id} }
    ).then(
        updateSuccess = (data) => {    
            res.status(200).json(data);
        },
        updateError = (err) => {
            res.status(500).send(err.message);
        }
    )
});

/* ALLOWS USER TO DELETE THEIR COMMENT THEY PUT ON A PRODUCT */
router.delete('/comment/:id', (req, res) => {
    db.Comments.destroy({
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