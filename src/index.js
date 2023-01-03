const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes");
const db = require("./config/db");





// Connect DB
db.connect();

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

// Config method PUT, DELETE for HTML because HTML just support method POST, GET
app.use(methodOverride("_method"));

//Custom middleware
app.use(SortMiddleware);


// HTTP logger
// app.use(morgan("combined"));

//Template Engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        }
        const types = {
          default:'desc',
          asc:'desc',
          desc:'asc',
        }
        const type = types[sortType]
        const icon = icons[sortType]

        return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
      }
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => {});
