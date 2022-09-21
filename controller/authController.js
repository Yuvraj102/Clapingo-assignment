const stdModel = require("../model/studentSchema");
const teachModel = require("../model/teacherSchema");
const checkFields = require("../utils/checkFields");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "123";
const JWT_EXPIRY = "90d";
const DAYS_90_INMILI = 90 * 24 * 60 * 60 * 1000;

async function hashPassword(text) {
  return await bcrypt.hash(text, 10);
}
function createJwtToken(data) {
  delete data.password;
  return jwt.sign(data, PRIVATE_KEY, { expiresIn: JWT_EXPIRY });
}
function sendResp(res, data, cookie = null) {
  if (cookie) {
    res.cookie(cookie.name, cookie.value, cookie.options);
  }
  res.json(data);
}
async function userExists(email, Model) {
  const result = await Model.findOne(email);

  return result;
}
async function signup(req, res, next) {
  let user = req.body;
  const result = checkFields(user, [
    "name",
    "email",
    "phone",
    "password",
    "college",
    "designation",
  ]);
  if (!result) {
    return next(new Error("fields are missing"));
  }

  // hash password
  user.password = await hashPassword(user.password);
  if (user.designation === "student") {
    if (await userExists({ email: user.email }, stdModel)) {
      return next(new Error("user already exists, use login"));
    }

    let std = await stdModel.create(user);

    let token = createJwtToken(std.toJSON());
    return sendResp(
      res,
      { token },
      {
        name: "token",
        value: token,
        options: { expires: new Date(Date.now() + DAYS_90_INMILI) },
      }
    );
  } else if (user.designation === "teacher") {
    if (await userExists({ email: user.email }, teachModel)) {
      return next(new Error("user already exists, use login"));
    }
    let teacher = await teachModel.create(user);
    let token = createJwtToken(teacher.toJSON());
    return sendResp(
      res,
      { token },
      {
        name: "token",
        value: token,
        options: { expires: new Date(Date.now() + DAYS_90_INMILI) },
      }
    );
  } else {
    return next(new Error("Invalid designation input while signing up"));
  }
}
// login

async function login(req, res, next) {
  let user = req.body;
  const result = checkFields(user, ["email", "password", "designation"]);
  if (!result) {
    return next(new Error("fields are missing"));
  }

  if (user.designation === "student") {
    const savedUser = await userExists({ email: user.email }, stdModel);
    if (!savedUser) {
      return next(new Error("user not found, kindly signup"));
    }
    // compare password

    if (!bcrypt.compareSync(user.password, savedUser.password)) {
      return next(new Error("wrong password"));
    }

    let token = createJwtToken(savedUser.toJSON());
    return sendResp(
      res,
      { token },
      {
        name: "token",
        value: token,
        options: { expires: new Date(Date.now() + DAYS_90_INMILI) },
      }
    );
  } else if (user.designation === "teacher") {
    const savedUser = await userExists({ email: user.email }, teachModel);
    if (!savedUser) {
      return next(new Error("user not found, kindly signup"));
    }
    // compare password

    if (!bcrypt.compareSync(user.password, savedUser.password)) {
      return next(new Error("wrong password"));
    }
    let token = createJwtToken(savedUser.toJSON());
    return sendResp(
      res,
      { token },
      {
        name: "token",
        value: token,
        options: { expires: new Date(Date.now() + DAYS_90_INMILI) },
      }
    );
  } else {
    return next(new Error("Invalid designation input while signing up"));
  }
}
// middleware function checks if the current user is logged in && is student
async function isLoggedIn(req, res, next) {
  let token;
  //   if (req.header)
  if (req.headers?.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies?.token;
  }
  //   decode token
  const decoded = jwt.verify(token, PRIVATE_KEY);

  const student = await stdModel.findOne({ email: decoded.email });
  if (!student) {
    return next(new Error("user not found, relogin"));
  }
  req.loggedUser = student;
  next();
}
module.exports = { signup, login, isLoggedIn };
