const router = require("express").Router(); // Objeto router de express
const booksController = require('../controllers/books.controller');


// GET http://localhost:3000/books
// GET http://localhost:3000/books/Hamlet
// GET http://localhost:3000/books/Harry Potter
// GET http://localhost:3000/books/Don Quijote de la mancha
// /:title ---> parámeto de ruta variable
// {/:title} ---> parámeto de ruta opcional

router.get("{/:title}", booksController.getBook);

// POST http://localhost:3000/books
/* 
    {
      "title": "Hamlet",
      "author": "Shakespeare",
      "year": 1623
    } 
  */
router.post("/", booksController.createBook);

// PUT http://localhost:3000/books
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
router.put("/", booksController.editBook);

// DELETE http://localhost:3000/books/Hamlet
// DELETE http://localhost:3000/books/Don Quijote
// DELETE http://localhost:3000/books/Harry Potter

router.delete("/:title", booksController.deleteBook);

module.exports = router; // Exportar el router
