const productsController = require("../controllers/products.controller");
const router = require("express").Router();

// GET http://localhost:3000/api/products/2
// GET http://localhost:3000/api/products
router.get("{/:id}", productsController.getProduct);

// POST http://localhost:3000/api/products
/*
A enviar por body:
{
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
"rating": {
"rate": 3.9,
"count": 120
}
}
*/
router.post("/", productsController.createProduct);
// PUT http://localhost:3000/api/products/2
router.put("/:id", productsController.editProduct);
// DELETE http://localhost:3000/api/products/2
router.delete("/:id", productsController.deleteProduct);



module.exports = router;
