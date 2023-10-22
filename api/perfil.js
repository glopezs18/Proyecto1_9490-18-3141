const express = require('express');
const mongoose = require('mongoose');
const { usersModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
var perfil = express.Router();

perfil.use(express.json());

mongoose.createConnection(process.env.MONGODB_URI)


// Perfil - Datos
perfil.get('/:dpi', verifyToken, function (req, res) {
    const dpi = req.params.dpi;
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            usersModel.findOne({ dpi: dpi }).then(function (data) {
                res.json({ success: true, result: data })
            }).catch(function (err) {
                res.json({ succes: false, result: err })
            })
        }
    });
});

// Perfil - Actualizar
perfil.put('/:dpi', verifyToken, function (req, res) {
    const dpi = req.params.dpi;
    const dataUser = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        dpi: dpi,
        fechaNacimiento: req.body.fechaNacimiento,
        // clave: req.body.clave,
        // validacionClave: req.body.validacionClave,
        direccionEntrega: req.body.direccionEntrega,
        nit: req.body.nit,
        numeroTelefonico: req.body.numeroTelefonico,
        correoElectronico: req.body.correoElectronico,
        rol: req.body.rol,
        user: req.body.user,

    };
    // res.json(dataUser)
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            usersModel.findOneAndUpdate({ dpi: dpi }, dataUser)
                .then(data => res.json({ success: true, message: "Se actualizó el usuario con éxito.", dpi: data.dpi }))
                .catch(err => res.json(err))
        }
    });
});

// Perfil - Borrar
perfil.delete('/:dpi', verifyToken, function (req, res) {
    const dpi = req.params.dpi;

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            usersModel.findOneAndDelete({ dpi: dpi })
                .then(res.json({ message: "Usuario eliminado." }))
                .catch(err => res.json(err))
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

module.exports = perfil
