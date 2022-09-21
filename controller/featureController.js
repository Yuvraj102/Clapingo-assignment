const stdModel = require("../model/studentSchema");
const teachModel = require("../model/teacherSchema");

// user should be logged in, is the requirement of this route, req.loggedUser
module.exports.addFav = async function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    return next(new Error("no query found"));
  }
  const teacher = await teachModel.findOne(req.query);
  if (!teacher) {
    return next(new Error("teacher not found"));
  }
  if (!req.loggedUser.fav.includes(teacher._id)) {
    req.loggedUser.fav.push(teacher);
    const savedUser = await req.loggedUser.save();
    if (savedUser) {
      return res.json({
        status: "success",
      });
    } else {
      return res.json({
        status: "fail",
      });
    }
  } else {
    return res.json({
      status: "success",
      message: "teacher already fav",
    });
  }
};

module.exports.removeFav = async function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    return next(new Error("no query found"));
  }
  const teacher = await teachModel.findOne(req.query);
  if (!teacher) {
    return next(new Error("teacher not found"));
  }
  //
  if (req.loggedUser.fav.includes(teacher._id)) {
    //remove teacher
    const index = req.loggedUser.fav.indexOf(teacher._id);
    if (index === -1) {
      return res.json({
        status: "fail",
        message: "teacher was not present",
      });
    }
    req.loggedUser.fav.splice(index, 1);
    const savedUser = await req.loggedUser.save();
    if (savedUser) {
      return res.json({
        status: "success",
      });
    } else {
      return res.json({
        status: "fail",
      });
    }
  } else {
    return res.json({
      status: "fail",
      message: "teacher was never in your list",
    });
  }
};

module.exports.getFav = async function (req, res) {
  const result = await stdModel.aggregate([
    { $unwind: { path: "$fav" } },
    { $sortByCount: "$fav" },
    { $limit: 1 },
  ]);

  if (!result) {
    res.json({
      message: "No fav teacher found",
    });
  } else {
    const favTeacher = await teachModel.findById(result[0]._id);
    res.json(favTeacher.toJSON());
  }
};
