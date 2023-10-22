const express = require('express');
const mongoose = require('mongoose');
const { usersModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
var login = express.Router();

login.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connecting mongoatlas'))
    .catch(err => console.log(`error: ${err}`))




//Api Main
login.get("/", (req, res) => {
    res.json({
        message: "Nodejs, JWT and MongoDB"
    });
});

// Login User
login.post('/', function (req, res) {

    const user = {
        user: req.body.username,
        clave: req.body.clave
    }

    usersModel.find({ user: user.user }).then(function (data) {        
        if (data.length != 0) {
            const validate = (data[0].clave == user.clave) ? true : false;
            if (validate) {
                jwt.sign({ user: user }, 'secretkey', (err, token) => {
                    res.json({
                        success: true,
                        message: "Acceso existoso",
                        token: token,
                        result: data[0]
                    })
                });
            } else {
                res.json({
                    success: false,
                    message: "Contraseña Inválida"
                })
            }
        } else {
            res.json({
                success: false,
                message: "Usuario Inválido"
            })
        }

    }).catch(function (err) {
        res.json({
            success: false,
            message: err
        })
    })
});


module.exports = login