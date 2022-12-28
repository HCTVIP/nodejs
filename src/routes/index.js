const newsRouter = require("./news");
const siteRouter = require("./site");

function route(app) {
  // Basic routing (request === req, response === res)
  // GET method
  app.use("/news", newsRouter);
  app.use("/", siteRouter);

  // POST method
  app.post("/search", (req, res) => {
    console.log(req.body);
    res.send("");
  });
}

module.exports = route;
