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
registro.post('/', function (req, res) {

    const user = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        dpi: req.body.dpi,
        fechaNacimiento: req.body.fechaNacimiento,
        clave: req.body.clave,
        validacionClave: req.body.validacionClave,
        nit: req.body.nit,
        numeroTelefonico: req.body.numeroTelefonico,
        correoElectronico: req.body.correoElectronico,
        rol: req.body.rol,
        user: req.body.user
    }

    usersModel.exists({ correoElectronico: user.correoElectronico }).then(function (data) {
        if (data) {
            res.json({
                success: false,
                data: data,
                message: "Ya existe un usuario con este correo."
            })
        } else {
            usersModel.create(user)
                .then(res.json({ success: true, message: "Usuario registrado con éxito." }))
                .catch(err => res.json(err))
        }
    }).catch(function (err) {
        res.json({success: false, message: err})
    })
});

module.exports = registro