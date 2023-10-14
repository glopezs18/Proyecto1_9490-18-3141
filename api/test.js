const express = require('express');
const mongoose = require('mongoose');
const { usersModel } = require('../includes/models.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
var test = express.Router();

test.use(express.json());

//Test conection
test.get("/", (req, res) => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(res.json({message: 'connecting mongoatlas'}))
        .catch(err => console.log(`error: ${err}`))
});

module.exports = test