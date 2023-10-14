const { MongoClient } = require("mongodb");
const express = require('express');
var test = express.Router();

test.use(express.json());
// Replace the uri string with your connection string.
const uri = "mongodb+srv://glopezs18:OjAPohZeP6e8Mofk@proyecto1.syhcvwk.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri);

test.get("/", async function(req, res) {
    try {
        const database = client.db('proyecto1_9490-18-3141');
        const users = database.collection('usuarios');
        // Query for a movie that has the title 'Back to the Future'
        const query = { dpi: '3315423311802' };
        const user = await users.findOne(query);
        res.json(user);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

module.exports = test