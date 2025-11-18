const productsController = require("../controllers/products.controller");
const router = require("express").Router();

// GET http://localhost:3000/api/products/2
// GET http://localhost:3000/api/products
router.get("{/:id}", productsController.getProduct);

// POST http://localhost:3000/api/products
/*
A enviar por body: (con el nuevo campo de nombre de provider para que haga la relación)
  {
    "id": 3,
    "title": "Ensalada de huevos con atún",
    "price": 2.5,
    "description": "Cafe jugosa del teatro",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
    "companyName": "La casa de las plantas"
  }
*/
router.post("/", productsController.createProduct);
// PUT http://localhost:3000/api/products/2
router.put("/:id", productsController.editProduct);
// DELETE http://localhost:3000/api/products/2
router.delete("/:id", productsController.deleteProduct);



module.exports = router;
