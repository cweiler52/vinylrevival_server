const express  = require('express');
const router = express.Router();
const Product = require('../db').import('../models/products');

/* GETS ALL PRODUCTS TO DISPLAY IN LIST /// ORDER BY later */
router.get('/products', (req, res) => {
    Product.findAll({
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
    Product.findOne({
        where: { id: req.params.id }
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
    Product.destroy({
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

module.exports = router;