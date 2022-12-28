const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

// Xử lý static files
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

//Template Engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

console.log("PATH:", path.join(__dirname, "resources/views"));

// Basic routing (request === req, response === res)
// GET method
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  console.log(req.query);
  res.render("news");
});

app.get("/search", (req, res) => {
  res.render("search");
});

// POST method
app.post("/search", (req, res) => {
  console.log(req.body);
  res.send("");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
