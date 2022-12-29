const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /home
  index(req, res, next) {
    // Use Callback
    // Course.find({}, function (err, courses) {
    //   if (!err) {
    //     res.json(courses);
    //   } else {
    //     res.status(400).json({ error: "ERROR" });
    //   }
    // });

    // Promise
    Course.find({})
      // .then((courses) => res.json(courses))
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next); // .catch(error => next (error))
  }
  //   [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
