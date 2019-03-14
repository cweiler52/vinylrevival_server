const express  = require('express');
const router = express.Router();
const db = require('../db').db;

/* ALLOWS ADMIN TO VIEW COMMENTS OF ONE PRODUCT BY ID */
router.delete('/products/:id', (req, res) => {
    db.Comments.destroy({
        where: { id: req.params.id }
    }).then(
        deleteShowSuccess = (commentid) => {
            res.status(200).send("comment was removed");
        },
        deleteShowError = (err) => {
            res.status(500).send(err.message);
        }
    );
});

module.exports = router;