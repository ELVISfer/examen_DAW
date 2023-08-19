const express = require('express');
const app = express();
app.use(express.json());


const rutausuario = require('./route/usuario');
app.use('/api/usuario', rutausuario);

const rutacontinente = require('./route/continente');
app.use('/api/continente', rutacontinente);

const rutacuidad = require('./route/cuidad');
app.use('/api/cuidad', rutacuidad);

const rutapais = require('./route/pais');
app.use('/api/pais', rutapais);

const rutarol = require('./route/rol');
app.use('/api/rol', rutarol);

const rutadireccion = require('./route/Direccion');
app.use('/api/direccion', rutadireccion);

app.listen(3003);