const { Router } = require("express");
const { nanoid } = require("nanoid");
const ErrorResponse = require("../classes/error-response");
const User = require("../database/models/User.model.js");
const Token = require("../database/models/Token.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/reg", asyncHandler(register));
  router.post("/auth", asyncHandler(auth));
}

async function register(req, res, next) {
  const checkUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (checkUser) {
    throw new ErrorResponse("This email already in use", 400);
  }
  //   const token = await Token.create({ userId: checkUser.id, value: nanoid() });
  //   res.setHeader("token", token.value);
  const newUser = await User.create(req.body);
  res.status(200).json({
    message: `OK, the new user info:\n${newUser}`,
  });
}

async function auth(req, res, next) {
  //На бэк отправляется email+password
  //Ищем пользователя с введенным email+password
  const checkUser = await User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  //Проверка - существует ли юзер в БД
  if (!checkUser) {
    throw new ErrorResponse("There is no user with this email", 404);
  }

  // Если email + password - корректны -> создаем в БД сущность Токен и возвращаем ее на фронт
  const token = await Token.create({
    userId: checkUser.id,
    value: nanoid(),
  });

  res.status(200).json({ accessToken: token.value });
}

initRoutes();

module.exports = router;
