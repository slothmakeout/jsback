const ErrorResponse = require("../classes/error-response");
const Token = require("../database/models/Token.model");

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const notFound = (req, _res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const errorHandler = (e, request, res, _) => {
  let code = 500;
  if (typeof e.code === "number") {
    code = e.code;
  }

  return res.status(code || 500).json({
    message: e.message,
  });
};

const requireToken = async (req, res, next) => {
  const accessToken = req.get("x-access-token");
  if (!token) {
    throw Error("Token wasn't sent", 401);
  }
  const tokenFromDB = await Token.findOne({
    where: {
      value: accessToken,
    },
  });
  if (!tokenfromDB) {
    throw Error("Wrong token", 400);
  }
  req.token = tokenFromDB;

  next();
};

module.exports = {
  asyncHandler,
  syncHandler,
  notFound,
  errorHandler,
  requireToken,
};
