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

// Configuración de motor de plantillas con PUG
app.set('view engine', 'pug');
app.set('views','./views');

// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Habilitar recepción de JSON por mi backend
// Parsear el body entrante a JSON
app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos del front CSS, JS, assets

// Rutas
const entriesRoutes = require("./routes/entries.routes");
const booksRoutes = require("./routes/books.routes");
const productsRoutes = require("./routes/products.routes");
const productsWebRoutes = require("./routes/products.web.routes");

// GET http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API
// Rutas habilitadas
app.use("/api/books", booksRoutes); // Usar las rutas definidas en books.routes.js
app.use("/api/products", productsRoutes); // Usar las rutas definidas en products.routes.js
app.use("/api/entries", entriesRoutes); // Rutas de entries

// WEB
// Rutas web
app.use('/products',productsWebRoutes);

// http://localhost:3000/first_template
app.get('/first_template', function(req, res){
  res.render('first_view.pug');
});

app.get('/dynamic_view', function(req, res){
  res.render('dynamic.pug', {
     name: "The Bridge of Torre Picasso", 
     url:"https://thebridge.tech/"
  });
});

// Habilitar ruta about
app.get('/about', function(req, res){
  res.render('about');
});


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

module.exports = app; // Exportar la app para usarla en tests
