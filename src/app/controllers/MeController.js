const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    //Gộp lại
    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          courses: multipleMongooseToObject(courses),
          deletedCount,
        })
      )
      .catch(next);

    // 2 trường hợp
    // Course.countDocumentsDeleted()
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(() => {});

    // Course.find({})
    //   .then((courses) =>
    //     res.render("me/stored-courses", {
    //       courses: multipleMongooseToObject(courses),
    //     })
    //   )
    //   .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}
module.exports = new MeController();
