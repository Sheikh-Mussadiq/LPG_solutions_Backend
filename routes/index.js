const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const quoteController = require('../controllers/quoteController');
// Product routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Order routes
router.post('/orders', orderController.createOrder);

// Quote routes
router.post('/quote', quoteController.sendQuoteRequest)

// Contact Us routes
router.post('/contact', quoteController.sendContactUs)


module.exports = router;