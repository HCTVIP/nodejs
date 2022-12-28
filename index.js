// const path = require('path');
const express = require("express");
// const morgan = require('morgan');
// const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

// // HTTP logger
// app.use(morgan('combined'));

// // //Template Engine
// app.engine('handlebars', handlebars());
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'resources/views'));

// console.log ('PATH:', path.join(__dirname, 'resources/views'));
app.get("/tin-tuc", (req, res) => {
  var a = 1;
  var b = 2;
  var c = a + b;
  return res.send("ghfgh32423fgh");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
