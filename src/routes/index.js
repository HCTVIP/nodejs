const newsRouter = require("./news");
const meRouter = require("./me");
const coursesRouter = require("./courses");
const siteRouter = require("./site");

function route(app) {
  // Basic routing (request === req, response === res)
  // GET method
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteRouter);

  // POST method
  app.post("/search", (req, res) => {
    res.send("");
  });
}

module.exports = route;
