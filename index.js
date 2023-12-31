const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const test = require('./api/test');
const registro = require('./api/registro');
const login = require('./api/login');
const perfil = require('./api/perfil');
const productos = require('./api/productos');
const producto = require('./api/producto');
const carrito = require('./api/carrito');
const compra = require('./api/compra');
const usuarios = require('./api/usuarios');

app.use(cors());

app.use('/api/registro', registro);
app.use('/api/login', login);
app.use('/api/perfil', perfil);
app.use('/api/productos', productos);
app.use('/api/producto', producto);
app.use('/api/carrito', carrito);
app.use('/api/compra', compra);
app.use('/api/usuarios', usuarios);
app.use('/images', express.static('./public/images'));
app.use('/api/test', test);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});