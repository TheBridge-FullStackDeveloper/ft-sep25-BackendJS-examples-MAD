const express = require("express"); // Importando express
const app = express(); // Creando el servidor
const port = 3000; // Puerto de pruebas

// Habilitar recepción de JSON por mi backend
// Parsear el body entrante a JSON
app.use(express.json());

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
/* 
  {
    "title": "Hamlet",
    "author": "Shakespeare",
    "year": 1623
  } 
*/
app.post("/books", (req, res) => {
  console.log(req.body);

  const new_book = req.body;

  // Con query SQL seria:
  // INSERT INTO books (title, author, year) VALUES (...,...,...)

  if (new_book.title && new_book.author && new_book.year) {
    books.push(new_book); // Guardar
    res.status(201).json({ success: true, msj: "Libro creado!", new_book });
  } else {
    res.status(400).json({ success: false, msj: "Fallo al crear libro!" });
  }
});

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
app.put("/books", (req, res) => {
  const book_data = req.body;
  console.log(book_data);

  // Con query SQL seria:
  // UPDATE books SET title=..., author=..., year=... WHERE title=...

  if (book_data.title) {
    // Busca la pos del libro. Devuelve -1 si no lo encuentra
    const index = books.findIndex((b) => b.title == book_data.title);
    
    if(index != -1){ // libro encontrado
      //books[index] = book_data;
      
      // editar el libro
      // new_title
      // book_data.new_title? books[index].title = book_data.new_title:"";
      // book_data.year? books[index].year = book_data.year:"";
      // book_data.author? books[index].author = book_data.author:"";

      const {new_title} = book_data; // Destructuring. Extrae el new_title en nueva variable
      delete book_data["new_title"]; // elimino clave new title
      book_data.title = new_title; // Sobreescribo el title
      books[index] = book_data;

      book_edited = books[index];

      res.status(200).json({ success: true, msj: "Libro editado!", book_edited });
    }else{
      res.status(404).json({ success: false, msj: "libro no encontrado!", book_data });
    }
  }
  else{
    res.status(400).json({ success: false, msj: "Error: Se requiere título de libro!", book_data });

  }
});

// DELETE http://localhost:3000/books/Hamlet
// DELETE http://localhost:3000/books/Don Quijote
// DELETE http://localhost:3000/books/Harry Potter

app.delete("/books/:title", (req, res) => {

  const title = req.params.title;

  // Con query SQL seria:
  // DELETE FROM books WHERE title=...

  if(title){
        // Busca la pos del libro. Devuelve -1 si no lo encuentra
        const index = books.findIndex((b) => b.title == title);
        if(index != -1){ // libro encontrado
          const book = books.splice(index,1)[0]; // borra 1 elemento a partir de pos=index
          res.status(200).json({ success: true, msj: "Libro borrado!",book});
        }
        else{
          res.status(404).json({ success: false, msj: "libro no encontrado!"});
        }
  }else{
    res.status(400).json({ success: false, msj: "Error: Se requiere título de libro!"});
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
