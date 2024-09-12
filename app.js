//Inicializo
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const server = app.listen(8080, ()=> console.log("Listing on PORT 8080"));

app.use(express.json());

const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/products.routes');

app.use('/api/carts.routes', cartsRouter);
app.use('/api/products.routes', productsRouter);