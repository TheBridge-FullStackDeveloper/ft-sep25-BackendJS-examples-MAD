const express = require("express"); // Importando express
const app = express(); // Creando el servidor
const port = 3000; // Puerto de pruebas

// En el futuro esto será mi "base de datos"
const books = [
  { title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
  },
  { title: "El señor de los anillos", author: "J.R.R. Tolkien", year: 1954 },
  { title: "El principito", author: "Antoine de Saint-Exupéry", year: 1943 },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    year: 1605,
  },
];

// GET http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET http://localhost:3000/otra
app.get("/otra", (req, res) => {
  res.send("Esto es otra ruta!");
});

// GET http://localhost:3000/books
// GET http://localhost:3000/books/Hamlet
// GET http://localhost:3000/books/Harry Potter
// GET http://localhost:3000/books/Don Quijote de la mancha
// /:title ---> parámeto de ruta variable
// {/:title} ---> parámeto de ruta opcional
app.get("/books{/:title}", (req, res) => {
  //console.log(req);
  console.log(req.params);
  const title = req.params.title;

  if (title) {
    // búsqueda de libro por título
    const book = books.find((book) => book.title === title);
    console.log(book);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ msj: "Book not found!" });
    }
  } else {
    res.status(200).json(books); // devolver todos los libros
  }
});

// POST http://localhost:3000/books
app.post("/books", (req, res) => {
  res.send("Libro creado!");
});

// PUT http://localhost:3000/books
app.put("/books", (req, res) => {
  res.send("Libro editado!");
});

// DELETE http://localhost:3000/books
app.delete("/books", (req, res) => {
  res.send("Libro borrado!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
