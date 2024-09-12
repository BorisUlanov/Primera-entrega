//Acento
import { router } from 'express';
const fs = require('fs');
const path = require('path');
const router = express.Router();
const productsFile = path.join(__dirname, '../data/products.json');

//Leer productos de las file
function readProductos() {
    return JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
}

//Escribir en las file
function writeProducts(products) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

//Get
router.get('/', (req, res) => {
    const products = readProducts();
    const limit =parseInt(req.query.limit, 10);
    if (limit) {
        return res.json(products.slice(0, limit));
    }
    res.json(products);
});

//get pid
router.get('/:pid', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.pid);
    if (!product) return res.status(404).json({ error: 'Product not found'});
    res.json(product);
});

//Post con Id único
router.post('/', (req, res) => {
    const products = readProducts();
    const newProduct = {
    id: Date.now().toString(),
        ...req.body,
    status: req.body.status ?? true
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

//Put pid
router.put('/:pid', (req, res) => {
    let products = readProducts();
    const index = products.findIndex(p => p.id === req.params.pid);

    if (index === -1) return res.status(404).json({ error: 'product not found'});
    
    products[index] = { ...products[index], ...req.body };
    writeProducts(products);
    res.json(products[index]);
});

//Borrar pid
router.delete('/:pid', (req, res) => {
    let products = readProducts();
    products = products.filter(p => p.id !== req.params.pid);
    writeProducts(products);
    res.status(204).send();
});

 module.exports = router;