/**
 * @author Alejandro Reyes <alejandroreyes.com> 
 * @exports checkApiKey
 * @namespace books_controller
 */

const { validationResult } = require("express-validator");

/**
 * Array que contiene los libros disponibles.
 * Cada libro tiene un título, autor y año de publicación.
 */
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

/**
 * Crea un nuevo libro y lo agrega al array de libros.
 * 
 * Este método valida los datos del libro proporcionados en el cuerpo de la solicitud.
 * Si los datos son válidos, el libro se agrega al array `books` y se devuelve una respuesta con éxito.
 * En caso de errores de validación, se devuelve una respuesta con los detalles de los errores.
 * 
 * @function createBook
 * @memberof books_controller
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.body - Contiene los datos del libro a crear.
 * @param {string} req.body.title - Título del libro.
 * @param {string} req.body.author - Autor del libro.
 * @param {number} req.body.year - Año de publicación del libro.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} Devuelve una respuesta HTTP con el estado de la operación.
 */
const createBook = (req, res) => {
  console.log(req.body);

  // Validación de datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const new_book = req.body;

  // Con query SQL seria:
  // INSERT INTO books (title, author, year) VALUES (...,...,...)
  books.push(new_book); // Guardar
  res.status(201).json({ success: true, msj: "Libro creado!", new_book });
};

/**
 * Obtiene un libro por su título o devuelve todos los libros si no se especifica un título.
 * @function getBook
 * @memberof books_controller
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.params - Contiene los parámetros de la solicitud.
 * @param {string} [req.params.title] - Título del libro a buscar.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const getBook = (req, res) => {
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
};

/**
 * Edita un libro existente basado en su título.
 * @function editBook
 * @memberof books_controller
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.body - Contiene los datos del libro a editar.
 * @param {string} req.body.title - Título del libro a editar.
 * @param {string} [req.body.new_title] - Nuevo título del libro.
 * @param {string} [req.body.author] - Nuevo autor del libro.
 * @param {number} [req.body.year] - Nuevo año de publicación del libro.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const editBook = (req, res) => {
  const book_data = req.body;
  console.log(book_data);

  // Con query SQL seria:
  // UPDATE books SET title=..., author=..., year=... WHERE title=...

  if (book_data.title) {
    // Busca la pos del libro. Devuelve -1 si no lo encuentra
    const index = books.findIndex((b) => b.title == book_data.title);

    if (index != -1) {
      // libro encontrado
      //books[index] = book_data;

      // editar el libro
      // new_title
      // book_data.new_title? books[index].title = book_data.new_title:"";
      // book_data.year? books[index].year = book_data.year:"";
      // book_data.author? books[index].author = book_data.author:"";

      const { new_title } = book_data; // Destructuring. Extrae el new_title en nueva variable
      delete book_data["new_title"]; // elimino clave new title
      book_data.title = new_title; // Sobreescribo el title
      books[index] = book_data;

      book_edited = books[index];

      res
        .status(200)
        .json({ success: true, msj: "Libro editado!", book_edited });
    } else {
      res
        .status(404)
        .json({ success: false, msj: "libro no encontrado!", book_data });
    }
  } else {
    res.status(400).json({
      success: false,
      msj: "Error: Se requiere título de libro!",
      book_data,
    });
  }
};

/**
 * Elimina un libro basado en su título.
 * @function deleteBook
 * @memberof books_controller
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.params - Contiene los parámetros de la solicitud.
 * @param {string} req.params.title - Título del libro a eliminar.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const deleteBook = (req, res) => {
  // Validación de datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const title = req.params.title;

  // Con query SQL seria:
  // DELETE FROM books WHERE title=...

  // Busca la pos del libro. Devuelve -1 si no lo encuentra
  const index = books.findIndex((b) => b.title == title);
  if (index != -1) {
    // libro encontrado
    const book = books.splice(index, 1)[0]; // borra 1 elemento a partir de pos=index
    res.status(200).json({ success: true, msj: "Libro borrado!", book });
  } else {
    res.status(404).json({ success: false, msj: "libro no encontrado!" });
  }
};

module.exports = {
  createBook,
  getBook,
  editBook,
  deleteBook,
};
