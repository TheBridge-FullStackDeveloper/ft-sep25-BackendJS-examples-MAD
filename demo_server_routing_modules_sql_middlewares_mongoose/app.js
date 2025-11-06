const express = require("express"); // Importando express
const cowsay = require("cowsay");

const app = express(); // Creando el servidor
const port = 3000; // Puerto de pruebas

// Leer fichero .env
require('dotenv').config();

// Middlewares
const error404 = require("./middlewares/error404");
// Morgan
const morgan = require("./middlewares/morgan");

// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const entriesRoutes = require("./routes/entries.routes");

// Habilitar recepción de JSON por mi backend
// Parsear el body entrante a JSON
app.use(express.json());

// Rutas
const booksRoutes = require("./routes/books.routes");
const productsRoutes = require("./routes/products.routes");

// GET http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API
// Rutas habilitadas
app.use("/api/books", booksRoutes); // Usar las rutas definidas en books.routes.js
app.use("/api/products", productsRoutes); // Usar las rutas definidas en products.routes.js
app.use("/api/entries", entriesRoutes); // Rutas de entries

app.use(error404); // Manejo de rutas no encontradas

// Iniciar el servidor
app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "owl", // Use the owl ASCII art // owl
    })
  );
});
