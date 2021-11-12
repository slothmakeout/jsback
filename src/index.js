const express = require("express");
const http = require("http");
const cors = require('cors');
const { initDB } = require("./database/database");
const apiTodosRouter = require("./controllers/api-todos.controller");
const apiAuthRouter = require("./controllers/api-auth.controller");
const apiUsersRouter = require("./controllers/api-users.controller");
const { notFound, errorHandler} = require('./middlewares/middlewares');
const app = express();

initDB();

app.use((req, res, next) => {
  console.log("URL = ", req.url);
  console.log("Original_URL = ", req.originalUrl);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("IsSecure = ", req.secure);
  console.log("BODY", req.body);
  console.log("QUERY", req.query);

  next();
});

app.use(express.json());
app.use("/api/todos", apiTodosRouter);
app.use("/api/auth", apiAuthRouter);
app.use("/api/user", apiUsersRouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3000, () => {
  console.log("Server started");
});
