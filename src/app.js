import express from 'express';
import cartsRouter from './routes/carts.routes';
import productsRouter from './routes/products.router';
const app = express();
const server = app.listen(8080, ()=> console.log("Listing on PORT 8080"));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

let tareas = [];

function isValidDate(dateString){
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

app.get( '/tareas' , (request, response) => {
    response.json(tareas)
})

app.post(  '/taeas' , (request, response) => {
    const {titulo, descripcion, fechaVencimiento} =request.body;

    if(!titulo || !descripcion, fechaVencimiento || !isValidDate(fechaVencimiento)){
       return response.status(400).json({ error : 'datos inválidos'});
    }

    const nuevaTarea = {
        titulo,
        descripcion,
        fechaVencimiento,
    };

    tareas.push(nuevaTarea);
    response.status(201).json(nuevaTarea);
})

app.put(  ' ' , (request, response) => {

})

app.delete(  ' ' , (request, response) => {

})