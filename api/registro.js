const express = require('express');
const mongoose = require('mongoose');
const { usersModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
var registro = express.Router();

registro.use(express.json());

mongoose.createConnection(process.env.MONGODB_URI)

//Registro main
registro.get("/", (req, res) => {
    res.json({
        message: "Registro de usuarios - Proyecto 1"
    });
});

// Registro Usuario
registro.post('/:dpi', function (req, res) {

    const user = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        dpi: req.params.dpi,
        fechaNacimiento: req.body.fechaNacimiento,
        clave: req.body.clave,
        validacionClave: req.body.validacionClave,
        nit: req.body.nit,
        numeroTelefonico: req.body.numeroTelefonico,
        correoElectronico: req.body.correoElectronico,
    }

    usersModel.exists({ correoElectronico: user.correoElectronico }).then(function (data) {
        if (data) {
            res.json({
                data: data,
                message: "Ya existe un usuario con este correo."
            })
        } else {
            usersModel.create(user)
            .then(res.json({ message: "Usuario registrado con éxito." }))
            .catch(err => res.json(err))
        }        
    }).catch(function (err) {
        console.log(err)
    })
});

module.exports = registro