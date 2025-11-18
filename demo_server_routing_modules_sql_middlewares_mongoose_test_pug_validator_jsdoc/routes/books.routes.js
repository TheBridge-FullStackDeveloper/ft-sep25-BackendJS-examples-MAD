const router = require("express").Router(); // Objeto router de express
const booksController = require('../controllers/books.controller');
const checkApiKey = require("../middlewares/auth_api_key");
const {validateCreateBook,validateDeleteBook}= require('../validators/books.validators');



// GET http://localhost:3000/books
// GET http://localhost:3000/books/Hamlet
// GET http://localhost:3000/books/Harry Potter
// GET http://localhost:3000/books/Don Quijote de la mancha
// /:title ---> parámeto de ruta variable
// {/:title} ---> parámeto de ruta opcional

router.get("{/:title}", booksController.getBook);

// POST http://localhost:3000/api/books
/* 
    {
      "title": "Hamlet",
      "author": "Shakespeare",
      "year": 1623
    } 
  */
router.post("/", checkApiKey, validateCreateBook, booksController.createBook);

// PUT http://localhost:3000/api/books
// Editar libro: se hace búsqueda por título
// Si se desea cambiar el título, enviarlo en new_title
/* 
  {
    "title": "Cien años de soledad",
    "new_title":"Cien años de soledad 2",
    "author": "Gabriel García Márquez",
    "year": 1967
  } 
    */
router.put("/", checkApiKey, booksController.editBook);

// DELETE http://localhost:3000/api/books/Hamlet
// DELETE http://localhost:3000/books/Don Quijote
// DELETE http://localhost:3000/books/Harry Potter

router.delete("/:title", checkApiKey, validateDeleteBook, booksController.deleteBook);

module.exports = router; // Exportar el router
