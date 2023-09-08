const express = require('express');
const mongoose = require('mongoose');
const { purchaseModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
var compra = express.Router();

compra.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/proyecto1_9490-18-3141')

// Mostrar productos de carrito de compras
compra.get('/', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {            
            res.sendStatus(403);
        } else {
            res.json({
                message: "purchase"
            });
        }
    });
});


// Authorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = compra