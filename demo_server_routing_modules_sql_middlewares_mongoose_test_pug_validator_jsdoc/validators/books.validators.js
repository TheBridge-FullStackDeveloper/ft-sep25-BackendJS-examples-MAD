const {param, query, body} = require("express-validator");


const validateCreateBook =  [
   body("title")
     .exists()
     .withMessage("Title of book is required")
     .isString()
     .withMessage("Title should be string"),
   body("author")
     .exists()
     .withMessage("Book author is required")
     .isString()
     .withMessage("Author should be string")
     .isLength({ min: 5 })
     .withMessage("Author should be at least 5 characters"),
   body("pages")
     .exists()
     .withMessage("Book pages is required")
     .isNumeric()
     .withMessage("Pages must be numeric"),
   body("year")
     .exists()
     .withMessage("Year is required")
     .isNumeric()
     .withMessage("Year must be numeric"),
   body("description")
     .exists()
     .withMessage("Description is required")
     .isString()
     .withMessage("Description should be string")
     .isLength({ min: 500 })
     .withMessage("Description at least 500 characters") 
   ];

   // title = " ";
 const validateDeleteBook =  [
   param('title').trim().notEmpty().withMessage("Title should exist to delete a book")
]

module.exports = {
   validateCreateBook,
   validateDeleteBook
}