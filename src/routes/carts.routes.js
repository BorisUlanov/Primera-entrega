//Acento
import { router } from 'express';
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cartsFile = path.join(__dirname, '../data-carts-json');
const productsFile = path.join(__dirname, '../data/products.json');

//leer data
function readCarts() {
    return JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
}

//Escribir data
function writeCarts(carts) {
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
}

//Leer products que lo voy a usar

function readProducts() {
    return JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
}

//Post con id único
router.post('/', (req,res) => {
    const carts =readCarts();
    const newCarts = {
        id: Date.now().toString(),
        products: []
    };
});

//get cid (identificador de carrito)
router.get('/:cid',(req, res) => {
    cosnt cats = readCarts();
    const cart  carts.fid(c => c.id === eq.params.cid);
    if (!cart) reurn res.status(404).json({ error: 'cart not found'});
});

//Post cid pid
router.post('/:cid/prpduct/pid', (req, res) => {
cosnt carts = readCarts();
const products = readProducts();
const cart = carts.find(c => c.id === req.params.cid);
const product = product.find(p => p.id === req.params.pid);
if (!cart) return res.status (404).json({ error: 'Cart not found'});
if(!product) return res.status(404).json({ error: 'Product not found'});
const existingProduct = cart.products.find(p => p.product === req.params.pid);
if (existingProduct) {
    existingProduct.quantity += 1;
} else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
}
writeCarts(carts);
res.json(cart);
});

module.exports = router;