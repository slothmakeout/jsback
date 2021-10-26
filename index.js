const express = require('express');
const http = require('http');
const { initDB } = require('./database/database');
const todoRouter = require('./routes/todoRouter.js');

const app = express();

initDB();

app.use(logger);
app.use(express.json());

app.use('/todo', todoRouter);

http.createServer(app).listen(3000, () => {
    console.log('Server started');
})
