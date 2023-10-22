const express = require('express');
const mongoose = require('mongoose');
const { usersModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
var usuarios = express.Router();

usuarios.use(express.json());

mongoose.createConnection(process.env.MONGODB_URI)

// Get data
usuarios.get('/', function (req, res) {

    usersModel.find({}).then(function(data){
        // data.push({token: req.token})
        res.json(data)
    }).catch(function(err) {
        console.log(err)
    })

    
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

module.exports = usuarios