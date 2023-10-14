const express = require('express');
const mongoose = require('mongoose');
const { usersModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
var login = express.Router();

login.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log('connecting mongoatlas'))
    .catch(err => console.log(`error: ${err}`))


//Api Main
login.get("/", (req, res) => {
    res.json({
        message: "Nodejs, JWT and MongoDB"
    });
});

login.get("/users", (req, res) => {
    const result = usersModel.find({});
    try {
        res.json(result)
    } catch(error) {
        res.json(error)
    }
});

// Login User
login.post('/', function (req, res) {

    const user = {
        correoElectronico: req.body.correoElectronico,
        clave: req.body.clave
    }

    usersModel.find({ correoElectronico: user.correoElectronico }).then(function (data) {
        const validate = (data[0].clave == user.clave) ? true : false;
        if (validate) {
            jwt.sign({ user: user }, 'secretkey', (err, token) => {
                res.json({
                    message: "Acceso existoso",
                    token: token
                })
            });
        }
    }).catch(function (err) {
        console.log(err)
    })
});


module.exports = login