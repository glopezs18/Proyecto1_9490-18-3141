const express = require('express');
const mongoose = require('mongoose');
const { productsModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
var producto = express.Router();

producto.use(express.json());

mongoose.createConnection(process.env.MONGODB_URI)

// Producto - Datos
producto.get('/:id', verifyToken, function (req, res) {
    const id = req.params.id;
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.setHeader("code", 401)
            res.sendStatus(403);
        } else {
            productsModel.findById({ _id: id }).then(function (data) {
                res.json({ success: true, result: data })
            }).catch(function (err) {
                console.log(err)
            })
        }
    });
});

// Producto - Actualizar
producto.put('/:id', verifyToken, function (req, res) {
    const id = req.params.id;
    const dataProduct = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        disponibilidad: req.body.disponibilidad,
        descuento: req.body.descuento,
        precio: req.body.precio,
        precioDescuento: (req.body.precio - req.body.descuento),
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        categorias: req.body.categorias

    };

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.setHeader("code", 401)
            res.sendStatus(403);
        } else {
            productsModel.findByIdAndUpdate({ _id: id }, dataProduct)
                .then(data => res.json({ success: true, message: "Se actualizó el registro.", id: data._id }))
                .catch(err => res.json(err))
        }
    });
});

// Producto - Borrar
producto.delete('/:id', verifyToken, function (req, res) {
    const id = req.params.id;

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.setHeader("code", 401)
            res.sendStatus(403);
        } else {
            productsModel.findByIdAndDelete({ _id: id })
                .then(res.json({ success: true, message: "Producto eliminado." }))
                .catch(err => res.json({ success: false, message: err }))
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

module.exports = producto